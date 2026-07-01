# <img src="_static/logo.png" alt="photon-mosaic logo" width="36" style="vertical-align: middle; margin-right:8px"> photon-mosaic

`photon-mosaic` is a collaborative project that aims to standardise multiphoton image analysis in neuroscience. Development is currently led by the [Neuroinformatics Unit](https://neuroinformatics.dev/), the [Allen Institute for Neural Dynamics](https://alleninstitute.org/division/neural-dynamics/) and the [International Brain Laboratory](https://www.internationalbrainlab.com/).

<img src="_static/general_schematic.png" alt="photon-mosaic overview schematic">

We are currently working on two repositories:

- [`photon-mosaic`](https://github.com/photon-mosaic/photon-mosaic): a modular, extensible Python API package that handles all the steps required for multiphoton imaging, from image processing to signal processing, up to the extraction of DF/F and spikes. We aim to be inclusive of different algorithms at every step of the analysis and to ensure interoperability between tools built by different researchers. We also aim to provide tutorials, documentation, and high test coverage in order to guarantee reproducibility and standardisation, and to keep the analysis optimised from a memory-consumption perspective. Our architectural foundations are inspired by [SpikeInterface](https://spikeinterface.readthedocs.io/).

- [`photon-mosaic-pipeline`](https://pipeline.photon-mosaic.org): a workflow package, based on [Snakemake](https://snakemake.readthedocs.io/), that automates analysis steps on HPC systems, leverages GPUs, and standardises outputs using the [NeuroBlueprint](https://neuroblueprint.neuroinformatics.dev/) format. It currently depends only on external packages, but we plan to integrate it with the `photon-mosaic` library in the future.
