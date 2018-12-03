#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import random as rd
import pickle as pkl 
from scipy.optimize import minimize

seedNums = np.arange(10, 41)

# read in the generated Data
with open("Data/GeneratedData.pkl", "rb") as infile:
    GenData = pkl.load(infile)

# single objective Gradient Descent with RMSE fitness function
###############################################################
bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

initGuess = [1.0, 1.0, 
             0.01, 0.0, 0.1, 1.0]
Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
seedNums = np.arange(10, 41)
Sigmas = [0, 0.5, 1.25, 1.50]
time = np.arange(0, 40)

SigNMDict = {}
SigLBDict = {}

for sig in Sigmas: 
    NMDict = {}
    LBDict = {}
    chData = GenData[sig]
    
    for seedNum in seedNums:

        np.random.seed(seedNum)
        rd.seed(seedNum)

        solNM = minimize(fm.FitnessFuncSO, initGuess, method='Nelder-Mead', 
                         bounds=bounds, 
                         args=(y0, time, chData, False, True))

        solLB = minimize(fm.FitnessFuncSO, initGuess, method='L-BFGS-B',
                         bounds=bounds,
                         args=(y0, time, chData, False, True))

        NMDict[seedNum] = solNM
        LBDict[seedNum] = solLB
    SigNMDict[sig] = NMDict
    SigLBDict[sig] = LBDict

with open('Data/GradientBestNMGenData.pkl', 'wb') as outfile:
    pkl.dump(SigNMDict, outfile)

with open('Data/GradientBestLBGenData.pkl', 'wb') as outfile:
    pkl.dump(SigLBDict, outfile)

