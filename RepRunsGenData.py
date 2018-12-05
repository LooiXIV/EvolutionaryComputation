#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import scipy.stats as stats
import FussmanModel as fm
import scipy.integrate as inte

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

# Read in the original Generated Data
infile = open("Data/GeneratedData.pkl", "rb")
GenData = pkl.load(infile)

orgEsts = [3.3, 4.30, 0.25, 0.3, 3.3, 15]

bounds = [[0.01, 10.0], [1.0, 50.0], 
          [0.01, 5.0], [0.0, 10.0], [0.1, 50.0], [0.01, 50.0]]
algoNames = ["NSGAII", "SPEA2", "DE", "L-BFGS-B", "Nelder-Mead"]
numPlot = np.arange(0, 30 + 1)


varsTest = {}

# initial starting Conditions
Ni = 80 
C = 2.5
R = 0.7
y0 = [Ni, C, R]


# actual parameter values
e=0.25;				#e=assimilation efficiency
m=0.0;   			#m=mortality (same as dilution)
betaC=3.3;		    	#bc=maximum recuitment rate for Chlorella
betaR=2.25;	    		#bb=maximum recruitment rate for Brachionus
Kc=4.3;				#half saturation constant for Chlorella
Kr=15;				#half saturation constant for Brachionus
ActualParams = [betaC, Kc,
                e, m, betaR, Kr]


# amount of time in days to run the simulation
t = np.arange(0, 40)

# line styles
linestyles = [(0, (3, 5, 1, 5, 1, 5)),
            (0, (3, 1, 1, 1, 1, 1)),
            (0, (1, 1)),
            (0, (5, 1))]

# loop through the sigmas and reorganize the data
Sigmas = [0, 0.5, 1.25, 1.50]

fig, Allaxes = plt.subplots(len(Sigmas), len(algoNames), figsize=(15, 7))
fig.subplots_adjust(wspace=0, hspace=0,
                    left=0.1, right=0.9, 
                    bottom=0.1, top=0.9)

counter = 0
for axes, sig in zip(Allaxes, Sigmas):
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

    # Get all the error values and calc the mean and std
    errorNSGAII1 = np.array([sol.objectives[0] for sol in NSGAIIrankSols])
    errorNSGAII2 = np.array([sol.objectives[1] for sol in NSGAIIrankSols])
    errorSPEA1 = np.array([sol.objectives[0] for sol in SPEA2rankSols])
    errorSPEA2 = np.array([sol.objectives[1] for sol in SPEA2rankSols])
    errorDE = np.array([salDE[seed].fun for seed in salDE.keys()])
    errorNM = np.array([salNM[seed].fun for seed in salNM.keys()])
    errorLB = np.array([salLB[seed].fun for seed in salLB.keys()])

    errorMeans = [[np.mean(errorNSGAII1), np.mean(errorNSGAII2)],
                  [np.mean(errorSPEA1), np.mean(errorSPEA2)],
                  np.mean(errorDE),
                  np.mean(errorNM),
                  np.mean(errorLB)]
    errorStds = [[np.std(errorNSGAII1), np.std(errorNSGAII2)],
                  [np.std(errorSPEA1), np.std(errorSPEA2)],
                  np.std(errorDE),
                  np.std(errorNM),
                  np.std(errorLB)]

    allParamsEsts = [parmsNSGAII, parmsSPEA2, parmsDE, parmsNM, parmsLB]
    algoFig = {}

    # loop through each Algorithm
    # create the figure objects
    for meanLabs, stdLabs, ax, algoParams in zip(errorMeans, errorStds, axes, allParamsEsts):

        ax2 = ax.twinx()
        data = GenData[sig]
        # loop through all the parameters estimates from an algorithm
        algoSols = []
        for params in algoParams:
            sol = inte.odeint(fm.Fussman_Org, y0, t, args=(params,))
            # create the runs using the estimated parameters
            ax.plot(t, sol[:,1], alpha=0.02, color="g")
            ax2.plot(t, sol[:,2], alpha=0.02, color="r")

        # plot the actual Generated Data 
        ax.plot(t, data[:,0], color="darkblue", linestyle=linestyles[2])
        ax2.plot(t, data[:,1], color="darkmagenta", linestyle=linestyles[3])
        # set the axis limits and remove the values for cleaner plots.
        ax.set_ylim([0, np.max(data)+5])
        ax2.set_ylim(0, np.max(data[:,1]+2))
        ax.set_xticks([])
        ax.set_xticklabels([])
        ax.set_yticks([])
        ax.set_yticklabels([])
        if np.array_equal(algoParams, parmsNSGAII) or np.array_equal(algoParams, parmsSPEA2):
            textlabel = "Pred: "+str(np.round(meanLabs[0], 2))+r"$\pm$"+str(np.round(stdLabs[0], 3))+"\n"+\
                        "Prey: "+str(np.round(meanLabs[1], 2))+r"$\pm$"+str(np.round(stdLabs[1], 3))
        else:
            textlabel = str(np.round(meanLabs, 2))+r"$\pm$"+str(np.round(stdLabs, 3))
        # text box of the means and std of the errors
        tbox = ax2.text(x=np.max(t), y=np.max(data[:,1])+1, s=textlabel,
                       verticalalignment="top", horizontalalignment="right")
        tbox.set_bbox(dict(alpha=0.85, facecolor="white", edgecolor="grey", boxstyle="round"))

        ax2.set_yticks([])
        ax2.set_yticklabels([])
        if counter <= 4:
            ax.set_title(algoNames[counter], fontsize=15)
        if counter == 0 or counter == 5 or counter == 10 or counter == 15:
            ax.set_ylabel(r"$\sigma$ = "+str(sig), horizontalalignment="right", 
                    rotation=0, fontsize=15, labelpad=5)
        counter += 1
lineLeg = [Line2D([0], [0], linestyle=linestyles[2], color="darkblue"),
           Line2D([0], [0], linestyle=linestyles[3], color="darkmagenta"),
           Line2D([0], [0], color="g"),
           Line2D([0], [0], color="r")]
lineLegLabels = ["True Prey", "True Predator", 
                 "Estimated Prey", "Estimated Predator"]
leg = plt.legend(lineLeg, lineLegLabels,loc=9,
           bbox_to_anchor=(-1.5, -0.15), ncol=4,
           fontsize=14)

plt.savefig("Figures/RepPlotsGenData.jpeg", dpi=300)
plt.show()
