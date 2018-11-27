import functools
from platypus import NSGAII, Problem, Real

def problem_with_args(x, arg1, arg2=5):
    print("x:", x)
    print("arg1:", arg1)
    print("arg2:", arg2)

    return [x[0]**2, (x[0]-2)**2]

problem = Problem(1, 2)
problem.types[:] = bounds 
problem.function = functools.partial(problem_with_args, arg1=2, arg2=7)

algorithm = NSGAII(problem)
algorithm.run(100)


