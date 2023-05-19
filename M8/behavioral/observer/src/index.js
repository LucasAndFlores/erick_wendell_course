import Payment from "./events/payments.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";


const subject = new PaymentSubject()
const marketing = new Marketing()
subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({userName: 'lucas andrade', id: Date.now()})

subject.unsubscribe(marketing)
// only will show shipment console log
    
payment.creditCard({userName: 'carl', id: Date.now()})
