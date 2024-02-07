import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import Navbar from "../../components/UI/Navigation/Navbar/Navbar";
import AuthService from "../../ApiServices/auth.service";

const Stripe = (props) => {
  const [courseLink] = React.useState(props.match.params.CourseLink);
  const [course, setCourse] = React.useState(null);

  const stripeTestPromise = loadStripe(
    "pk_test_51OEZ0gSI6FP2xiQeie186m1xCsL37QhcarQYkPFZYpFmSsphfc6NUv6pdweT5tYKptmQCCVPDPEJkzom1XwdoAnu00DPt48pYJ"
  );

  React.useEffect(() => {
    console.log(courseLink);
    AuthService.StripePayment_course(courseLink)
      .then((response) => {
        console.log("Response:", response);
        setCourse(response.data.course);
      })

      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  let courseName = null;
  let teacherName = null;
  let price = null;
  let courseId = null;

  if (course != null) {
    courseName = course.title;
    teacherName = course.name;
    price = course.price;
    courseId = course._id;
    console.log(course._id);
  }

  return (
    <>
      <Navbar />
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm
          courseName={courseName}
          price={price}
          teacherName={teacherName}
          courseId={courseId}
        />
      </Elements>
    </>
  );
};

export default Stripe;
