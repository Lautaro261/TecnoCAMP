import PaymentViewLayout from "./PaymentViewLayout";
import FailurePayment from "../../../components/Client/PaymentResponses/FailurePayment";

const FailurePaymentView = () => {
    return (
        <PaymentViewLayout>
            <FailurePayment />
        </PaymentViewLayout>
    );
};

export default FailurePaymentView;