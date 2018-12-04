import numpy as np
import FussmanModel as fm
import scipy.integrate as inte
import matplotlib.pyplot as plt

def makeNoisyData(y0, t, parms, sigma):
    genData = inte.odeint(fm.Fussman_Org, y0, t, args=(parms,))
    noisyData = genData + np.random.normal(0,sigma, genData.shape)
    return noisyData




t = np.arange(0, 37)
y0 = [80., 2.5, 0.7]
parms = [2.0, 5., .25, .4, 2., 20.]
sigma = 0.
genData = inte.odeint(fm.Fussman_Org, y0, t, args=(parms,))[:,1:3]
noisyData = genData + np.random.normal(0,sigma, genData.shape)

np.savetxt("Data/noisyData2" + ".txt", noisyData, 
            header="Chlorella\tRotifers")










plt.plot(t, genData[:,0], label="Generated chlorella")
plt.plot(t, genData[:,1], label="Generated rotifers")
plt.plot(t, noisyData[:,0], label="Noisy generated chlorella")
plt.plot(t, noisyData[:,1], label="Noisy generated rotifers")
plt.legend()
plt.show()



















