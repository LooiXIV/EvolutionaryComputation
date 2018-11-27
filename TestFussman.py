#!/anaconda3/bin/env python3
# -*-utf-8-*-
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm

t_space = np.arange(0,37)

##3 g/L##
# bb - m = 0.7 (growth rate)
# Initial Conditions
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

parms = [delta, 
         betaC, Kc,
         e, m, betaR, Kr]

# d, Ni, betaC, rhoC, Kc, m, betaR, rhoR, Kr, tau, Se, pwr
sol = inte.odeint(fm.Fussman_Org, y0, t_space, args=(parms,))

# plot the simulation
fig, ax1 = plt.subplots()
ax1.plot(t_space, sol[:,1], color='green')
ax1.set_xlabel('Days')
ax1.set_ylabel('Chlorella Density')

ax2 = ax1.twinx()
ax2.plot(t_space, sol[:,2], color='red')
ax2.set_ylabel('Rotifer Density')
plt.show()
