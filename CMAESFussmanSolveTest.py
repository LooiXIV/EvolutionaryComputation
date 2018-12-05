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
time = np.arange(0, 37)

data = np.loadtxt("Data/noisyData.txt")
for s in seedNums:
    p = GetSol(data, time, y0, s).result.xbest
    print(p)

    genData = inte.odeint(fm.Fussman_Org, y0, time, args=(p,))
    plt.plot(time, data[:,0], 'orange', label="Chlorella (true)")
    plt.plot(time, data[:,1], 'red', label="Rotifer (true)")
    plt.plot(time, genData[:,1], 'blue', label="Chlorella")
    plt.plot(time, genData[:,2], 'green', label="Rotifer")
    plt.legend()
    plt.show()





