
export function getLinkedAddress(address) {
    return `https://mumbai.polygonscan.com/address/${address}`
}

export function toETHdenomination(number){
    return number/10**18
}