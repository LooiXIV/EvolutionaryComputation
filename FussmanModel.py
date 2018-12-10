#!/anaconda3/bin/env python3
# -*-utf-8-*-

import numpy as np
import matplotlib.pyplot as plt
import scipy.integrate as inte

def Fussman_Egg(y0, t, parms):

    """
    The predator-prey ode with Rotifer Eggs
    takes three variables:
    x0 = Initial concentrations for all populations
    t  = A list of integers or whole numbers to run the simulation
         over. 
    parms = a list consisting of all parameters needed to run the model
            See 'Parameters' 12 total parameters needed.

    Parameters:
    _______________________________________________________
    d:     parms[0]  # Delta
    Ni:    parms[1]  # Initial Nitrogen
    betaC: parms[2]  # Offspring production: Chlorella
    rhoC:  parms[3]  # Assimilation rate of Chorella
    Kc:    parms[4]  # Half Saturation constant of Chlorella
    m:     parms[5]  # Death rate of Rotifers
    betaR: parms[6]  # Offspring production of Rotifers
    rhoR:  parms[7]  # Rotifer consumption Rate
    Kr:    parms[8]  # Half saturation constant for R
    pwr:   parms[9]  # Sensitivity of Rotifer growth rate to 
                     #    algal density
    tau:   parms[10] # Egg development time of rotifers
    Se:    parms[11] # Egg Viability of Rotifers

    Populations (Correspond to initial concentrations):
    _______________________________________________________
    dN: Concentration of Nitrogen
    dC: Concentration of Chlorella
    dJ: Concentration of Juvenile Rotifers
    dA: Concentration of Adult Rotifers
    dD: Concentration of Dead Rotifers
    """
    #ex0=np.exp(y0); 
    ex0=y0; 
    N = ex0[0]; C = ex0[1]; E = ex0[2]; R = ex0[3];

    ## Parameters
    # Whole system parameters
    d = parms[0] 
    
    # Chlorella parameters
    Ni = parms[1] # Initial Nitrogen Concentration 
    betaC = parms[2] # offspring production: Chlorella
    rhoC = parms[3] # Assimilation rate of Chlorella
    Kc = parms[4] # Half Saturation constant Chlorella
    
    # Rotifer parameters
    m = parms[5] # death rate of Rotifers
    betaR = parms[6] # offspring production: R
    rhoR = parms[7] # R consumption rate
    Kr = parms[8] # half saturation constant for R
    pwr = parms[9] # sensitivity of R growth rate to C density
    tau = parms[10]  # Egg development time
    Se = parms[11]  # Egg Viability of R

    # Chlorella sub-Equations
    FcN1 = (rhoC*N*C)/(Kc+N)
    FcN2 = rhoC*R*(C**pwr)/(Kr**pwr+C**pwr)

    # Rotifer sub-Equations
    FrC1 = (betaC*N*C)/Kc+N
    FrC2 = betaR*C*(t-tau)**pwr*R*(r-tau)/(Kr**pwr+C*(t-tau)**pwr)

    # The ODE equations
    dN = d*(Ni-N)-FcN1
    dC = FrC1-FcN2-d*C
    dE = FrC2-E*(d+(1/tau))
    dR = Se*(E/tau) - R*(d+m)
        
    #return list(dN/N, dC/C, dE/E, dR/R, dD/E);
    return list(dN, dC, dE, dR, dD);


def Fussman_NoEgg(y0, t, parms):

    """
    The predator-prey ode without Rotifer Eggs

    Parameters:
    _______________________________________________________
    d:     parms[0] # Delta
    Ni:    parms[1] # Initial Nitrogen
    betaC: parms[2] # Offspring production: Chlorella
    rhoC:  parms[3] # Assimilation rate of Chorella
    Kc:    parms[4] # Half Saturation constant of Chlorella
    m:     parms[5] # Death rate of Rotifers
    betaR: parms[6] # Offspring production of Rotifers
    rhoR:  parms[7] # Rotifer consumption Rate
    Kr:    parms[8] # Half saturation constant for R
    pwr:   parms[9] # Sensitivity of R growth rate to C density

    Populations:
    _______________________________________________________
    dN: Concentration of Nitrogen
    dC: Concentration of Chlorella
    dJ: Concentration of Juvenile Rotifers
    dA: Concentration of Adult Rotifers
    dD: Concentration of Dead Rotifers
    """
    ex0 = np.exp(y0); 
    N = ex0[0]
    C = ex0[1]
    R = ex0[2]

    ## Parameters
    # Whole system parameters
    d = parms[0] 
    
    # Chlorella parameters
    Ni = parms[1] # Initial Nitrogen Concentration 
    betaC = parms[2] # offspring production: Chlorella
    rhoC = parms[3] # Assimilation rate of Chlorella
    Kc = parms[4] # Half Saturation constant Chlorella
    
    # Rotifer parameters
    m = parms[5] # death rate of Rotifers
    betaR = parms[6] # offspring production: R
    rhoR = parms[7] # R consumption rate
    Kr = parms[8] # half saturation constant for R
    pwr = parms[9] # sensitivity of R growth rate to C density

    ## Equations
    # Chlorella sub-Equations
    FcN1 = (rhoC*N*C)/(Kc+N)
    FcN2 = rhoC*R*(C**pwr)/(Kr**pwr+C**pwr)

    # Rotifer sub-Equations
    FrC1 = (betaC*N*C)/Kc+N
    FrC2 = betaR*(C**pwr)*R/((Kr**pwr)+(C**pwr))
    
    # The ODE equations
    dN = d*(Ni-N)-FcN1
    dC = FrC1-FcN2-d*C
    dR = FrC2-(d+m)*R
        
    #return [dN/N, dC/C, dR/R];
    return [dN, dC, dR];

def Fussman_Juv(y0, t, parms):

    """
    The predator-prey ode with Juveniles

    Parameters:
    _______________________________________________________
    d:     parms[0]  # Delta
    Ni:    parms[1]  # Initial Nitrogen
    betaC: parms[2]  # Offspring production: Chlorella
    rhoC:  parms[3]  # Assimilation rate of Chorella
    Kc:    parms[4]  # Half Saturation constant of Chlorella
    m:     parms[5]  # Death rate of Rotifers
    betaR: parms[6]  # Offspring production of Rotifers
    Kr:    parms[8]  # Half saturation constant for R
    tau:   parms[9[  # Egg development time
    chiR:  parms[10] # Essimilation constant of Rotifers*

    Populations:
    _______________________________________________________
    dN: Concentration of Nitrogen
    dC: Concentration of Chlorella
    dJ: Concentration of Juvenile Rotifers
    dA: Concentration of Adult Rotifers
    dD: Concentration of Dead Rotifers
    """
    ## Initial Populations
    N = y0[0]
    C = y0[1]
    J = y0[2]
    A = y0[3]
    D = y0[4]

    ## Parameters
    # Whole system parameters
    d = parms[0] 
    
    # Chlorella parameters
    Ni = parms[1] # Initial Nitrogen Concentration 
    betaC = parms[2] # offspring production: Chlorella
    rhoC = parms[3] # Assimilation rate of Chlorella
    Kc = parms[4] # Half Saturation constant Chlorella
    chiC = parms[5]
    
    # Rotifer parameters
    m = parms[6] # death rate of Rotifers
    betaR = parms[7] # offspring production: R

    Kr = parms[8] # half saturation constant for R
    tau = parms[9] # time delay
    chiR = parms[10] # Essimilation constant of Rotifers*

    FcN = (betaC*N)/(Kc+N) # Chlorella
    FrC = (betaR*C)/(Kr+C) # Rotifer

    dN = d*(Ni-N)-FcN*C/chiC
    dC = FcN*C-FrC*(J+A)/chiR-d*C
    dJ = FrC*A-J*((1/tau)+d);
    dA = (J/tau)-A*(d+m)
    dD = m*A-d*D
    
    return [dN, dC, dJ, dA, dD]


def Fussman_Org(y0, t, parms):

    """
    The predator-prey ode with Juveniles

    Parameters:
    _______________________________________________________
    betaC: parms[0]  # Offspring production: Chlorella
    Kc:    parms[1]  # Half Saturation constant of Chlorella
    e:     parms[2]  # Assimilation efficiency of rotifers
    m:     parms[3]  # Death rate of Rotifers
    betaR: parms[4]  # Offspring production of Rotifers
    Kr:    parms[5]  # Half saturation constant for R

    Populations:
    _______________________________________________________
    dN: Concentration of Nitrogen
    dC: Concentration of Chlorella
    dR: Concentration of Rotifers
    """
    ## Parameters
    # Whole system parameters
    #d = parms[0] 
    
    # Chlorella parameters
    #Ni = parms[1] # Initial Nitrogen Concentration 
    betaC = parms[0] # offspring production: Chlorella
    Kc = parms[1] # Half Saturation constant Chlorella
    
    # Rotifer parameters
    e = parms[2] # assimilation rate
    m = parms[3] # death rate of Rotifers
    betaR = parms[4] # offspring production: R
    Kr = parms[5] # half saturation constant for R
    
    ##initial conditions
    N = y0[0]
    C = y0[1]
    R = y0[2]

    ##Recruitment rates
    FcN = betaC*N/(Kc+N);	#Chlorella
    FbC = betaR*C/(Kr+C);	#Brachionus

    ##Differential equations
    dN=0.4*(80-N)-FcN*C;
    dC=FcN*C-(FbC*R/e)-0.4*C;
    dR=FbC*R-(0.4+m)*R;

    return [dN, dC, dR]


# The fitness functions
########################################################################
def FitnessFuncSO(parms, y0, t, data, normMSE=False, RMSE=False):
    """
    The Fitness Function which houses different fitness functions combining 
    Rotifer MSE and Chlorella MSE into a single objective fitness function.
    """
    sol = inte.odeint(Fussman_Org, y0, t, args=(parms,))

    sol[np.isnan(sol)] = np.inf

    if normMSE:
        RDiff = (data[:,0] - sol[:,1]) # Rotifers
        CDiff = (data[:,1] - sol[:,2]) # Chlorella

        normR = RDiff/np.max(RDiff)
        normC = CDiff/np.max(CDiff)

        RSquare = (normR)**2 # Rotifers
        CSquare = (normC)**2 # Chlorella

        Ret_rotifers = np.sum(RSquare)/len(data)
        Ret_chlorella = np.sum(CSquare)/len(data)

    elif RMSE:
        MSE_rotifers = np.sum((data[:,0] - sol[:,1])**2)/len(data)
        MSE_chlorella = np.sum((data[:,1] - sol[:,2])**2)/len(data)

        Ret_rotifers = np.sqrt(MSE_rotifers)/np.mean(data[:,0])
        Ret_chlorella = np.sqrt(MSE_chlorella)/np.mean(data[:,1])

    else:
        Ret_rotifers = np.sum((data[:,0] - sol[:,1])**2)/len(data)
        Ret_chlorella = np.sum((data[:,1] - sol[:,2])**2)/len(data)
    
    return Ret_rotifers + Ret_chlorella

def FittnessFuncMO(parms, y0, t, data, normMSE=False, RMSE=True):
    """
    The Fitness Function for the multi-objective problem.
    """
    
    sol = inte.odeint(Fussman_Org, y0, t, args=(parms,))
    
    sol[np.isnan(sol)] = np.inf
    if normMSE:

        RDiff = (data[:,0] - sol[:,1]) # Rotifers
        CDiff = (data[:,1] - sol[:,2]) # Chlorella

        normR = RDiff/np.max(RDiff)
        normC = CDiff/np.max(CDiff)

        RSquare = (normR)**2 # Rotifers
        CSquare = (normC)**2 # Chlorella

        MSE_rotifers = np.sum(RSquare)/len(data)
        MSE_chlorella = np.sum(CSquare)/len(data)

    elif RMSE:

        MSE_rotifers = np.sum((data[:,0] - sol[:,1])**2)/len(data)
        MSE_chlorella = np.sum((data[:,1] - sol[:,2])**2)/len(data)

        MSE_rotifers = np.sqrt(MSE_rotifers)/np.mean(data[:,0])
        MSE_chlorella = np.sqrt(MSE_chlorella)/np.mean(data[:,1])
    else:
        MSE_rotifers = np.sum((data[:,0] - sol[:,1])**2)/len(data)
        MSE_chlorella = np.sum((data[:,1] - sol[:,2])**2)/len(data)

    return [MSE_rotifers, MSE_chlorella]


# Plotting Functions
########################################################################
def PlotFussman(t, y1, y2):
    # plot the simulation
    fig, ax1 = plt.subplots()
    ax1.plot(t, y1, color='green')
    ax1.set_xlabel('Days')
    ax1.set_ylabel('Chlorella Density')

    ax2 = ax1.twinx()
    ax2.plot(t, y2, color='red')
    ax2.set_ylabel('Rotifer Density')
    plt.show()

def PlotFussmanTest(t, y1, y2, d1, d2):
    # plot the simulation
    fig, ax1 = plt.subplots()
    ax1.plot(t, y1, color='green')
    ax1.set_xlabel('Days')
    ax1.set_ylabel('Chlorella Density')
    ax1.plot(t, d1, 'blue')

    ax2 = ax1.twinx()
    ax2.plot(t, y2, color='red')
    ax2.set_ylabel('Rotifer Density')
    ax2.plot(t, d2, 'magenta')
    plt.show()


def plotMOEAConverge(MOEAConverge, xlims=[0,3.0], ylims=[0,3.0]):
    """
    plot covergence of the MOEA methods
    """
    paretoLabs = []
    for sal in MOEAConverge.keys():
        ParetoSets = MOEAConverge[sal]
        for PVal in ParetoSets.keys():
            PSet = ParetoSets[PVal]
            obj1 = []
            obj2 = []
            paretoLabs.append(PVal)
            for objs in PSet:
                obj1.append(objs[0])
                obj2.append(objs[1])

            plt.scatter(obj1, obj2, marker='o')
        plt.xlim(xlims)
        plt.ylim(ylims)
        plt.xlabel('Chlorella RMSE')
        plt.ylabel('Rotifer RMSE')
        plt.legend(paretoLabs, loc='upper left')
        plt.show()
# Data Generating Functions
########################################################################
def makeNoisyData(y0, t, parms, sigma):
    """
    Synthetically generate data.
    add noise to the data if sigma greater than 0.
    """
    genData = inte.odeint(Fussman_Org, y0, t, args=(parms,))
    noisyData = genData + np.random.lognormal(0, sigma, genData.shape)
    return noisyData

