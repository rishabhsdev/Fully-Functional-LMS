const api_key = require("../config/config");
const stripe = require("stripe")(api_key.stripePayment);
const Course = require("../model/courses");
const User = require("../model/user");

exports.stripeCourse = (req, res) => {
  const courseId = req.params.courseId;
  Course.findById({ _id: courseId })
    .then((course) => {
      res.status(200).json({ course: course });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.stripePayment = (req, res) => {
  let { amount, id, courseId, userId } = req.body;
  console.log("amount", amount, id);

  //   User.findById(userId, (err, user) => {
  //     // if (err) {
  //     //   // Handle the error, for example, send an error response to the client
  //     //   return res.status(500).json({ error: "Internal Server Error" });
  //     // }

  //     // if (!user) {
  //     //   // User not found, send a response indicating that
  //     //   return res.status(404).json({ error: "User not found" });
  //     // }

  //     // Check if the user has purchased the course
  //     console.log(userId);
  //     console.log(courseId);
  //     user.courses.push(courseId);
  //   });
  User.findById({ _id: userId }).then((user) => {
    user.courses.push(courseId);
    user.save();
  });

  stripe.paymentIntents
    .create({
      amount: amount,
      currency: "inr",
      description: "Coursera clone just testing",
      payment_method: id,
      confirm: true,
    })
    .then((response) => {
      console.log(response);
      res.status(200).json({
        message: "payment successful",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    });
};
