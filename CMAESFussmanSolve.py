#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
import cma
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
#from deap import creator, base, tools, algorithms, cma

bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]


# single objective with weighted fitness function
##################################################
Ni = 80
C = 2.5
R = 0.7
y0 = [Ni, C, R]
time = np.arange(0, 37)
trueSol = [2., 5., .25, .4, 2., 20.]

data = np.loadtxt("Data/noisyData.txt")

def constrainedFitness(parms):
    fitness = fm.FitnessFuncSO(parms, y0, time, data, False, True)
    for n,b in enumerate(bounds):
        if parms[n] > b[1]:
            fitness = fitness*(1 + (parms[n] - b[1])/(b[1] - b[0]))
        elif parms[n] < b[0]:
            fitness = fitness*(1 + (b[0] - parms[n])/(b[1] - b[0]))

    return (fitness,)

for s in np.arange(11, 40):
    np.random.seed(s)
    es = cma.CMAEvolutionStrategy([(b[1] - b[0])/2. for b in bounds], 0.5)
    options = cma.CMAOptions()

    bestSol = es.optimize(fm.FitnessFuncSO, args=(y0, time, data, False, True), iterations=2000).result
    p = bestSol.xbest
    print(p)
    print(trueSol)

genData = inte.odeint(fm.Fussman_Org, y0, time, args=(p,))
plt.plot(time, data[:,0], 'orange', label="Chlorella (true)")
plt.plot(time, data[:,1], 'red', label="Rotifer (true)")
plt.plot(time, genData[:,0], 'blue', label="Chlorella")
plt.plot(time, genData[:,1], 'green', label="Rotifer")
plt.legend()
plt.show()












