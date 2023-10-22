
export interface IPkpWallet {
	//... define the properties of the pkpWallet object
	address: string;
	signMessage: (message: string) => Promise<string>;
	// add other methods and properties as needed
}
  