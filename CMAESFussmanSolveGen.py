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

seedNums = np.arange(10,41)
bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 40)

inFile = open("Data/GeneratedData.pkl","rb")
ChDataDict = pkl.load(inFile)

GenCMAESSol = {}
for sal in ChDataDict.keys():
    data = ChDataDict[sal]
    GenCMAESSol[sal] = {}
    for s in seedNums:
        p = GetSol(data, time, y0, s).xbest
        print(p)
        GenCMAESSol[sal][s] = p  



with open("SalCMAESSolutions.pkl", "wb") as outFile:
    pkl.dump(GenCMAESSol, outfile)


