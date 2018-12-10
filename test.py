import pickle as pkl
import numpy as np

with open("SalCMAESSolutions.pkl","rb") as inFile:
    pops = pkl.load(inFile, encoding='latin1')

with open("SalCMAESSolutions.pkl","wb") as outFile:
    pkl.dump(pops, outFile)

for sal,p in pops.items():
    print(sal)
    print(p)
