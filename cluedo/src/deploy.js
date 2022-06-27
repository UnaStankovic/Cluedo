async function main () {  
    console.log("started");
    const Guess = await ethers.getContractFactory("Guess");
    const guess = await Guess.deploy();
    await guess.deployed();
    console.log('Address', guess.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });