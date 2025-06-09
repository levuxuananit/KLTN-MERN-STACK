import { useEffect } from "react";
import { apiUpdateReportPaypal } from "../services";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

// This values are the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, amount, pid, days, setIsExpired, setUpdateData }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then(async function (rs) {
                    if (rs.status === 'COMPLETED') {
                        const response = await apiUpdateReportPaypal({ pid, days })
                        if (response.data.err === 0) {
                            setIsExpired(null)
                            toast.success('Gia hạn thành công')
                            setUpdateData(prev => !prev)
                        } else toast.error('Gia hạn thất bại')
                    }
                });
            }}
        />
    </>
    );
}

export default function Paypal({ amount, pid, days, setIsExpired, setUpdateData }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
                <ButtonWrapper
                    currency={"USD"}
                    showSpinner={false}
                    amount={amount}
                    days={days}
                    pid={pid}
                    setIsExpired={setIsExpired}
                    setUpdateData={setUpdateData}
                />
            </PayPalScriptProvider>
        </div>
    );
}