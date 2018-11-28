#!/anaconda3/bin/env python3
# -*-utf-8-*-
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt
import FussmanModel as fm

# Read in the MO SPEA2 convergence data
infile = open('ParetoSetsSPEA2.pkl', 'rb')
SPEA2Converge = pkl.load(infile)

# Read in the MO NSGAII convergence data
infile = open('ParetoSetsNSGAII.pkl', 'rb')
NSGAIIConverge = pkl.load(infile)

paretoLabs = []

# Plot the Pareto sets of the multi-objective formulation
# to see convergence of NSGAII
fm.plotMOEAConverge(NSGAIIConverge)

# Plot the Pareto sets of the multi-objective formulation
# to see convergence of SPEA2
fm.plotMOEAConverge(SPEA2Converge)

# Read in the DE concergence data
infile = open('DEConvergence.pkl', 'rb')
DEConverge = pkl.load(infile)
# Plot the single objective formulation to see convergence
Iters = []
Objectives = []
for SOVals in DEConverge.keys():
    Iters.append(int(SOVals))
    Objectives.append(DEConverge[SOVals])

plt.subplots_adjust(left=0.17, right=0.9, top=0.9, bottom=0.1)
plt.scatter(Iters, Objectives)
plt.ylim([0.95695, 0.95715])
plt.xlabel('Number of Function Evaluations')
plt.ylabel('Predator RMSE + Prey RMSE')
plt.show()
