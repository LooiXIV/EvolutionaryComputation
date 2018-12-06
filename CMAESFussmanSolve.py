#!/anaconda3/bin/env python3
# -*-utf-8-*-
from s import *
import cma
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm


def GetSol(data, time, y0, seed):
# Run CMAES on data given parameters time, y0, seed
# time: time steps to integrate over
# y0: Initial N,C,R
# seed: random seed for np.random.seed
    bounds = [(1.0, 10.0), (1.0, 25.0), 
              (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

    # Fitness function with linear penalty for exceeding bounds
    # Using single objective RMSE fitness function as base
    def constrainedFitness(parms):
        with stdout_redirected():
            fitness = fm.FitnessFuncSO(parms, y0, time, data, False, True)
        for n,b in enumerate(bounds):
            if parms[n] > b[1]:
                fitness = fitness*(1 + (parms[n] - b[1])/(b[1] - b[0]))
            elif parms[n] < b[0]:
                fitness = fitness*(1 + (b[0] - parms[n])/(b[1] - b[0]))

        return (fitness,)

    np.random.seed(seed)
    
    # Choose random starting point, lambda = 30
    es = cma.CMAEvolutionStrategy([np.random.uniform(b[0], b[1])  for b in bounds], 1.,
                                  {'popsize':30})

    # Run algorithm until stopping conditions are met
    while not es.stop():
        solutions = es.ask()
        es.tell(solutions, [constrainedFitness(s) for s in solutions])
    bestSol = es.result_pretty()
    return bestSol


