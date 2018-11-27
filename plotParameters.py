#!/anaconda3/bin/env python3
# -*-utf-8-*-
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt

# Read in the MO SPEA2 data
infile = open("BestSolutionsNSGAII.pkl", "rb")
NSGAII = pkl.load(infile)

# Read in the MO SPEA2 data
infile = open("BestSolutionsSPEA2.pkl", "rb")
SPEA2 = pkl.load(infile)
varsFit = [r"$\beta_C$", r"$K_c$", r"$e$", r"$m$", r"$\beta_R$", r"$K_r$"] 
orgEsts = [3.3, 4.30, 25, 0.3, 3.3, 15]

bounds = [[0.01, 10.0], [1.0, 50.0], 
          [0.01, 5.0], [0.0, 10.0], [0.1, 50.0], [0.01, 50.0]]


# loop through the salinities
for sal in SPEA2.keys():
    salSPEA2 = SPEA2[sal]
    salNSGAII = NSGAII[sal]

    allSolsSPEA2 = salSPEA2["End_Solutions"]
    allSolsNSGAII = salNSGAII["End_Solutions"]

    parmsNSGAII = [sol.variables for sol in allSolsSPEA2]
    parmsSPEA2 = [sol.variables for sol in allSolsNSGAII]

    parmsNSGAII = np.array(parmsNSGAII)
    parmsSPEA2 = np.array(parmsSPEA2)

    #NSGAIIpos = ticksPos-0.15
    #SPEA2pos = ticksPos+0.15
    #plt.figure(figsize=(10,5))
    ticksPos = np.arange(1, parmsNSGAII.shape[1]+1)

    fig, axes = plt.subplots(1, len(varsFit), figsize=(15, 5))
    fig.subplots_adjust(wspace=0.5)
    for n, ax in enumerate(axes):
        Nvals = parmsNSGAII[:,n]
        Svals = parmsSPEA2[:,n] 
        ax.boxplot([Nvals, Svals], sym="", widths=0.28)
        #ax.boxplot(Svals, sym="", widths=0.28)
        ax.axhline(orgEsts[n])
        ax.set_ylim(bounds[n])
        ax.set_xticks([1, 2])
        ax.set_xticklabels(["NSGAII", "SPEA2"])
        ax.set_title(varsFit[n], fontsize=10)
    #plt.boxplot(parmsNSGAII, positions=NSGAIIpos, sym="", widths=0.28)
    #plt.boxplot(parmsSPEA2, positions=SPEA2pos, sym="", widths=0.28)
    #plt.xticks(ticksPos, varLabs)
    plt.show()

