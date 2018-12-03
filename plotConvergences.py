#!/anaconda3/bin/env python3
# -*-utf-8-*-
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt
import FussmanModel as fm

plotMOEA = True

Categories = [3, 16, 35, 45]
# Plot the multi-objective DE to see convergence
###########################################################
# Read in the MO SPEA2 convergence data
infile = open('Data/ParetoSetsSPEA2.pkl', 'rb')
SPEA2Converge = pkl.load(infile)

# Read in the MO NSGAII convergence data
infile = open('Data/ParetoSetsNSGAII.pkl', 'rb')
NSGAIIConverge = pkl.load(infile)

paretoLabs = []
xlims=[0,2.0] 
ylims=[0,3.0]
markerToUse = ["o", "s", "D", "X", "^", "v", "P", "*"]
colorToUse = ["b", "r", "lime", "m", "cyan", "darkslategray", "k", "y"]
if plotMOEA:

    fig, axes = plt.subplots(2, len(Categories), figsize=(15, 8))
    fig.subplots_adjust(hspace=0.1, bottom=0.2)    
    for r, toPlot in enumerate([SPEA2Converge, NSGAIIConverge]):
        # Plot the Pareto sets of the multi-objective formulation
        # to see convergence of NSGAII    
        paretoLabs = []
        for c, sal in enumerate(toPlot.keys()):
            ParetoSets = toPlot[sal]
            pointChooser = 0
            for PVal in ParetoSets.keys():
                if PVal < 100:
                   continue 
                PSet = ParetoSets[PVal]
                obj1 = []
                obj2 = []
                paretoLabs.append(PVal)
                for objs in PSet:
                    obj1.append(objs[0])
                    obj2.append(objs[1])

                if r == 0:
                    axes[r,c].tick_params(axis='x', which='both', bottom=False,
                                   top=False, labelbottom=False)
                else:
                    axes[r,c].set_xlabel('Chlorella Error')
                if c == 0:
                    axes[r,c].set_ylabel('Rotifer Error')
                elif c > 0:
                    axes[r,c].set_yticklabels([])
                    axes[r,c].set_yticks([])
                axes[r,c].scatter(obj1, obj2, 
                                  marker=markerToUse[pointChooser],
                                  color=colorToUse[pointChooser])
                axes[r,c].set_xlim(xlims)
                axes[r,c].set_ylim(ylims)
                pointChooser += 1 
                
    plt.legend(paretoLabs, loc=9, ncol=len(paretoLabs), 
               bbox_to_anchor=(-1.3, -0.25), 
               title="Number of Function Evaluations")
    #plt.show()    
    plt.savefig("Figures/MOEAConvergence.png", dpi=600)
    # Plot the Pareto sets of the multi-objective formulation
    # to see convergence of SPEA2


# Plot the single objective DE to see convergence
###########################################################
# Read in the DE concergence data
infile = open('Data/SalDEConverge.pkl', 'rb')
DEConverge = pkl.load(infile)
Iters = []
Objectives = []

linestyle = [(0, (3, 5, 1, 5, 1, 5)),
            (0, (3, 1, 1, 1, 1, 1)),
            (0, (1, 1)),
            (0, (5, 10))]

pointstyle = ["o", "s", "D", "^"]

def chunker(l, n):
    for i in range(0, len(l), n):
        yield l[i:i+n]


for nc, cat in enumerate(DEConverge.keys()):
    
    Category = DEConverge[cat]
    seedPlot = {}
    for seed in Category.keys():

        seedSols = Category[seed]
        for sol in seedSols:
            Iters.append(seedSols[sol].nfev)
            Objectives.append(seedSols[sol].fun)

        seedPlot[seed] = {}
        seedPlot[seed]["nfev"] = Iters
        seedPlot[seed]["fun"] = Objectives
    plt.subplots_adjust(left=0.17, right=0.9, top=0.9, bottom=0.1)

    for seed in seedPlot.keys():
        
        nfev = list(chunker(seedPlot[seed]["nfev"], n=8))
        fun = list(chunker(seedPlot[seed]["fun"], n=8))
        nfev = np.mean(np.array(nfev), axis=0)
        fun = np.mean(np.array(fun), axis=0)
        error = np.std(np.array(fun), axis=0)

    #plt.plot(nfev, fun)
    plt.errorbar(nfev, fun, error, 
                 marker=pointstyle[nc], linestyle=linestyle[nc],
                 capsize=3)

plt.legend(labels=[str(c)+r"$gL^{-1}$"for c in Categories])
plt.xlabel('Number of Function Evaluations')
plt.ylabel('Predator RMSE + Prey RMSE')
plt.savefig("Figures/DESOConvergence.png", dpi=600)
#plt.show()

