// import Logo from '../../../assets/images/logo.png'

// const Button = () => {
//   const handlePayment = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/api/createOrder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();

//       if (!data.order) {
//         alert("Error creating order");
//         return;
//       }

//       const options = {
//         key: "rzp_test_R79F1bWUTRYNZh", // Test Key ID
//         amount: data.order.amount,
//         currency: "INR",
//         name: "Aaraadhya",
//         description: "Demo Payment",
//         image: Logo,
//         order_id: data.order.id,
//         prefill: {
//           name: "Test User",
//           email: "test@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#F37254",
//         },
//         handler: (response: {
//           razorpay_payment_id: string;
//           razorpay_order_id: string;
//           razorpay_signature: string;
//         }) => {
//           alert(
//             "Payment Successful!\nPayment ID: " + response.razorpay_payment_id
//           );
//         },
//         modal: {
//           ondismiss: () => {
//             alert("Payment modal closed");
//           },
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <>
//       <button onClick={handlePayment}>Pay Now</button>;
//     </>
//   );
// };
// export default Button;
