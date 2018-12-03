#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt

# function to sort and rank the best solutions according to their
# distance to the ideal point in the solution space
def RankSolutions(solutions, check=False):

    # Get the top 30 solutions from the MO algorithms
    listSol = []
    listFit = []
    for sol in solutions:
        fitness = np.sqrt(sol.objectives[1]**2+sol.objectives[0]**2)
        listFit.append(fitness)
        listSol.append(sol)
    # check to see that the sorting did it's job correctly.
    if check:
        calcDist = [np.sqrt(objs.objectives[0]**2+objs.objectives[1]**2) for objs in listSol]
        rankSolsCheck = zip(*sorted(zip(listFit, calcDist)))
        for t, t1 in rankSolsCheck:
            print(t, t1)

    arrayFit = np.array(listFit)
    arraySort = arrayFit.argsort().argsort()
    arraySol = np.array(listSol)
    return arraySol[arraySort]

# Read in the MO SPEA2 data
infile = open("Data/BestSolutionsNSGAIIGenData2.pkl", "rb")
NSGAII = pkl.load(infile)

# Read in the MO SPEA2 data
infile = open("Data/BestSolutionsSPEA2GenData2.pkl", "rb")
SPEA2 = pkl.load(infile)

# Read in SO DE 
infile = open("Data/SigDESolutions.pkl", "rb")
DE = pkl.load(infile)

# Read in Gradient Descent
infile = open("Data/GradientBestLBGenData.pkl", "rb")
LB = pkl.load(infile)

# Read in Gradient Descent Nelder-Mead
infile = open("Data/GradientBestNMGenData.pkl", "rb")
NM = pkl.load(infile)

Sigmas = [0, 0.5, 1.25, 1.50]

varsFit = [r"$\beta_C$", r"$K_c$", r"$e$", r"$m$", r"$\beta_R$", r"$K_r$"] 
orgEsts = [3.3, 4.30, 0.25, 0.3, 3.3, 15]

bounds = [[0.01, 10.0], [1.0, 50.0], 
          [0.01, 5.0], [0.0, 10.0], [0.1, 50.0], [0.01, 50.0]]

numPlot = np.arange(0, 30 + 1)

# loop through the salinities
fig, axes = plt.subplots(4, len(varsFit), figsize=(15, 8))

for ns, sig in enumerate(Sigmas):
    salSPEA2 = SPEA2[sig]
    salNSGAII = NSGAII[sig]
    salDE = DE[sig]
    salLB = LB[sig]
    salNM = NM[sig]

    allSolsSPEA2 = salSPEA2["End_Solutions"]
    allSolsNSGAII = salNSGAII["End_Solutions"]

    # Rank the solutions
    SPEA2rankSols = RankSolutions(allSolsSPEA2)
    NSGAIIrankSols = RankSolutions(allSolsNSGAII)

    parmsNSGAII = np.array([sol.variables for sol in NSGAIIrankSols])
    parmsSPEA2 = np.array([sol.variables for sol in SPEA2rankSols])
    parmsDE = np.array([salDE[seed].x for seed in salDE.keys()])
    parmsNM = np.array([salNM[seed].x for seed in salNM.keys()])
    parmsLB = np.array([salLB[seed].x for seed in salLB.keys()])
    
    fig.subplots_adjust(wspace=0.25, bottom=0.15, top=0.95)

    for n in np.arange(0, len(varsFit)):

        if sig == 0:

            arrow_args = dict(arrowstyle="-")
            # horizontal line
            #plt.annotate("", xy=(-38.4, 255), xytext=(6, 255), arrowprops=arrow_args,
            #            annotation_clip=False)
            # vertical line
            #plt.annotate("", xy=(-38.3, -35), xytext=(-38.3, 255.75), arrowprops=arrow_args,
            #            annotation_clip=False)
            axes[ns, n].set_title(varsFit[n], fontsize=20, y=1)
        
        Nvals = parmsNSGAII[numPlot,n]
        Svals = parmsSPEA2[numPlot,n] 
        Dvals = parmsDE[:,n]
        NMvals = parmsNM[:,n]
        LBvals = parmsLB[:,n]

        axes[ns, n].boxplot([Nvals, Svals, Dvals, LBvals, NMvals], 
                            widths=0.6) 
        axes[ns, n].axhline(orgEsts[n])
        axes[ns, n].set_ylim((bounds[n][0]-2, bounds[n][1]+2))

        if sig == 1.50:
            axes[ns, n].set_xticks(np.arange(1, 6))
            axes[ns, n].set_xticklabels(
                        ["NSGAII", "SPEA2", "DE", "L-BFGS-B", "Nelder-Mead"],
                        fontsize=15, rotation=45, ha="right")

        else:
            axes[ns, n].set_xticks([])
            axes[ns, n].set_xticklabels([])
        if n == 0:
            axes[ns, n].set_ylabel(r"$\sigma = $"+str(sig), labelpad=5,
                                   rotation='horizontal', fontsize=20,
                                   horizontalalignment="right")
plt.savefig("Figures/sigmaParameterFig.png", dpi=600)
plt.show()


