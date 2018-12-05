#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
from s import *
import cma
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm


def GetSol(data, time, y0, seed):
    bounds = [(1.0, 10.0), (1.0, 25.0), 
              (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]
#    bounds = [(3., 4.), (1., 5.), (.1, .3), (0., .1), (2., 3.), (10., 20.)]

    def constrainedFitness(parms):
        #return fm.FitnessFuncSO(parms, y0, time, data, False, True)
        with stdout_redirected():
            fitness = fm.FitnessFuncSO(parms, y0, time, data, False, True)
        for n,b in enumerate(bounds):
            if parms[n] > b[1]:
                fitness = fitness*(1 + (parms[n] - b[1])/(b[1] - b[0]))
            elif parms[n] < b[0]:
                fitness = fitness*(1 + (b[0] - parms[n])/(b[1] - b[0]))

        return (fitness,)

    np.random.seed(seed)

    es = cma.CMAEvolutionStrategy([np.random.uniform(b[0], b[1])  for b in bounds], 1.,
                                  {'popsize':30})

    while not es.stop():
        solutions = es.ask()
        es.tell(solutions, [constrainedFitness(s) for s in solutions])
        #es.disp()
    bestSol = es.result_pretty()
        #bestSol = es.optimize(constrainedFitness, iterations=20000)
    return bestSol


