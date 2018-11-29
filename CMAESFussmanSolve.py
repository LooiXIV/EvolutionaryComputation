#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
from deap import creator, base, tools, algorithms, cma

bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]


# single objective with weighted fitness function
##################################################
Ni = 80
C = 2.5
R = 0.7
y0 = [Ni, C, R]
time = np.arange(0, 37)

data = np.loadtxt("Data/noisyData.txt")

def constrainedFitness(parms):
    fitness = fm.FitnessFuncSO(parms, y0, time, data, False, True)
    for n,b in enumerate(bounds):
        if parms[n] > b[1]:
            fitness = fitness*(1 + (parms[n] - b[1])/(b[1] - b[0]))
        elif parms[n] < b[0]:
            fitness = fitness*(1 + (b[0] - parms[n])/(b[1] - b[0]))

    return (-fitness,)

creator.create("FitnessMax", base.Fitness, weights=(1.,))
creator.create("Individual", list, fitness=creator.FitnessMax)

toolbox = base.Toolbox()
toolbox.register("evaluate", constrainedFitness)

#np.random.seed(128)
N = 6
strategy = cma.Strategy(centroid=[(b[1] - b[0])/2. for b in bounds], sigma=.5, lambda_ = 15)
toolbox.register("generate", strategy.generate, creator.Individual)
toolbox.register("update", strategy.update)

hof = tools.HallOfFame(1)
stats = tools.Statistics(lambda ind: ind.fitness.values)
stats.register("avg", np.mean)
stats.register("std", np.std)
stats.register("min", np.min)
stats.register("max", np.max)

(population, logbook) = algorithms.eaGenerateUpdate(toolbox, ngen=100, stats=stats, halloffame=hof)

for p in population:
    genData = inte.odeint(fm.Fussman_Org, y0, time, args=(p,))

    plt.plot(time, data[:,0], 'orange', label="Chlorella (true)")
    plt.plot(time, data[:,1], 'red', label="Rotifer (true)")
    plt.plot(time, genData[:,0], 'blue', label="Chlorella")
    plt.plot(time, genData[:,1], 'green', label="Rotifer")
    plt.legend()
    plt.show()













