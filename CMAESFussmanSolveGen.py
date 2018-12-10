#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
from s import *
import cma
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import pickle as pkl
from CMAESFussmanSolve import *


# Initializations
seedNums = np.arange(10,41)
bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 40)

# Load data from file
inFile = open("Data/GeneratedData.pkl","rb")
ChDataDict = pkl.load(inFile)

# Run CMAES for each sigma for each random seed
GenCMAESSol = {}
for sigma in ChDataDict.keys():
    data = ChDataDict[sigma]
    GenCMAESSol[sigma] = {}
    for s in seedNums:
        p = GetSol(data, time, y0, s).xbest
        print(p)
        # Save best individual for each run
        GenCMAESSol[sigma][s] = p  


# Save best individuals to file
with open("GenCMAESSolutions.pkl", "wb") as outFile:
    pkl.dump(GenCMAESSol, outFile)

