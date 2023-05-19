export default class Payment {
    constructor(paymentSubject) {
        this.paymentSubject = paymentSubject
    }
    creditCard(paymentData) {
        console.log(`\n a payment occured from ${paymentData.userName}`)
        this.paymentSubject.notify(paymentData)
    }
}
