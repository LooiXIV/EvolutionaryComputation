#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import numpy as np
import matplotlib.pyplot as plt
import FussmanModel as fm
import pickle as pkl


# Generate our own data
############################################################
Ni = 80
C = 2.5
R = 0.7

# Parameters
delta=0.4;	    		#d=dilution rate
e=0.25;				#e=assimilation efficiency
m=0.0;   			#m=mortality (same as dilution)
betaC=3.3;		    	#bc=maximum recuitment rate for Chlorella
betaR=2.25;	    		#bb=maximum recruitment rate for Brachionus
Kc=4.3;				#half saturation constant for Chlorella
Kr=15;				#half saturation constant for Brachionus

y0 = [Ni, C, R]

parms = [betaC, Kc,
         e, m, betaR, Kr]

time = np.arange(0, 40)

Sigmas = [0, 0.5, 1.25, 1.50]
DataDict = {}

for sigma in Sigmas:
    Data = fm.makeNoisyData(y0, time, parms, sigma)

    fm.PlotFussman(time, Data[:,1], Data[:,2])
    
    DataDict[sigma] = Data[:,1:]
  
os.chdir("Data/")
with open("GeneratedData.pkl", "wb") as outfile:
    pkl.dump(DataDict, outfile)
