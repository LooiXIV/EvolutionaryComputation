#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt

# go to the correct directory
os.chdir('Data/')

# Read in the MO SPEA2 data
infile = open("BestSolutionsNSGAII.pkl", "rb")
NSGAII = pkl.load(infile)

# Read in the MO SPEA2 data
infile = open("BestSolutionsSPEA2.pkl", "rb")
SPEA2 = pkl.load(infile)

# Read in SO DE 
infile = open("SalDESolutions.pkl", "rb")
DE = pkl.load(infile)

# Read in Gradient Descent
infile = open("GradientBestLB.pkl", "rb")
LB = pkl.load(infile)

# Read in Gradient Descent Nelder-Mead
infile = open("GradientBestNM.pkl", "rb")
NM = pkl.load(infile)

salinities = [3, 16, 35, 45]

varsFit = [r"$\beta_C$", r"$K_c$", r"$e$", r"$m$", r"$\beta_R$", r"$K_r$"] 
orgEsts = [3.3, 4.30, 0.25, 0.3, 3.3, 15]

bounds = [[0.01, 10.0], [1.0, 50.0], 
          [0.01, 5.0], [0.0, 10.0], [0.1, 50.0], [0.01, 50.0]]


# loop through the salinities
fig, axes = plt.subplots(4, len(varsFit), figsize=(15, 8))

for ns, sal in enumerate(salinities):
    salSPEA2 = SPEA2[sal]
    salNSGAII = NSGAII[sal]
    salDE = DE[sal]
    salLB = LB[sal]
    salNM = NM[sal]

    allSolsSPEA2 = salSPEA2["End_Solutions"]
    allSolsNSGAII = salNSGAII["End_Solutions"]

    parmsNSGAII = [sol.variables for sol in allSolsSPEA2]
    parmsSPEA2 = [sol.variables for sol in allSolsNSGAII]
    parmsDE = [salDE[seed].x for seed in salDE.keys()]
    parmsNM = [salNM[seed].x for seed in salNM.keys()]
    parmsLB = [salLB[seed].x for seed in salLB.keys()]

    parmsNSGAII = np.array(parmsNSGAII)
    parmsSPEA2 = np.array(parmsSPEA2)
    parmsDE = np.array(parmsDE)
    parmsLB = np.array(parmsLB)
    parmsNM = np.array(parmsNM)
    
    #NSGAIIpos = ticksPos-0.15
    #SPEA2pos = ticksPos+0.15
    #plt.figure(figsize=(10,5))
    #ticksPos = np.arange(1, parmsNSGAII.shape[1]+1)


    #fig, axes = plt.subplots(1, len(varsFit), figsize=(15, 5))
    fig.subplots_adjust(wspace=0.5)

    #for n, ax in enumerate(axes):
    for n in np.arange(0, len(varsFit)):

        if sal == 3:

            arrow_args = dict(arrowstyle="-")
            # horizontal line
            plt.annotate("", xy=(-38.4, 255), xytext=(6, 255), arrowprops=arrow_args,
                        annotation_clip=False)
            # vertical line
            plt.annotate("", xy=(-38.3, -35), xytext=(-38.3, 255.75), arrowprops=arrow_args,
                        annotation_clip=False)
            axes[ns, n].set_title(varsFit[n], fontsize=14, y=1.2)
        
        Nvals = parmsNSGAII[:,n]
        Svals = parmsSPEA2[:,n] 
        Dvals = parmsDE[:,n]
        NMvals = parmsNM[:,n]
        LBvals = parmsLB[:,n]
        axes[ns, n].boxplot([Nvals, Svals, Dvals, LBvals, LBvals])#, 
                            #widths=0.2)
        #ax.boxplot(Svals, sym="", widths=0.28)
        axes[ns, n].axhline(orgEsts[n])
        axes[ns, n].set_ylim((bounds[n][0]-2, bounds[n][1]+2))

        if sal == 45:
            axes[ns, n].set_xticks(np.arange(1, 6))
            axes[ns, n].set_xticklabels(
                        ["NSGAII", "SPEA2", "DE", "L-BFGS-B", "Nelder-Mead"],
                        fontsize=10, rotation=45, ha="right")

        else:
            axes[ns, n].set_xticks([])
            axes[ns, n].set_xticklabels([])
        if n == 0:
            axes[ns, n].set_ylabel(str(sal)+r"$gL^{-1}$", labelpad=30,
                                   rotation='horizontal', fontsize=12)
    #fig.clf()
    #plt.boxplot(parmsNSGAII, positions=NSGAIIpos, sym="", widths=0.28)
    #plt.boxplot(parmsSPEA2, positions=SPEA2pos, sym="", widths=0.28)
    #plt.xticks(ticksPos, varLabs)

plt.show()

