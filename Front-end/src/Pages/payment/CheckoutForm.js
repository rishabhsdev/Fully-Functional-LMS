import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../ApiServices/auth.service";
import styles from "./stripe.module.css";

export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async (event) => {
    console.log(elements.getElement(CardElement));
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      const { id } = paymentMethod;
      AuthService.StripePayment({
        amount: 100,
        id: id,
        courseId: props.courseId,
        userId: localStorage.userId,
      })
        .then((res) => {
          console.log(res);
          alert("Payment successful");
          setTimeout(() => setRedirect("/course/all/"), 2000);
        })
        .catch((err) => {
          console.log(err);
          alert("Payment Failed");
        });
    } else {
      console.log(error.message);
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className={styles.Checkout}>
      <h2>Checkout</h2>
      <div className={styles.Course}>
        <div className={styles.Course_detail}>
          <p>Course Name: </p>

          <span className={styles.courseName}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/course/${props.courseName}/${props.courseId}`}
            >
              {" "}
              {props.courseName}{" "}
            </Link>
          </span>
        </div>

        <div className={styles.Course_detail}>
          <p>AMOUNT: </p>
          <span> INR {props.price}</span>
        </div>

        <div className={styles.Course_detail}>
          <p>Teacher Name: </p>
          <span className={styles.teacherName}> {props.teacherName} </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.CheckoutForm}
        style={{ maxWidth: 400 }}
      >
        <CardElement className={styles.CardElement} />
        <div className={styles.pay}>
          <button>Pay </button>
        </div>
      </form>
    </div>
  );
};
