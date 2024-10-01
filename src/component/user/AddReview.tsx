import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


import { AppDispatch, RootState } from "../../app/service/shared/store";
import { reviewActions } from "../../app/service/useAggregate/ReviewSlice";


interface ReviewFormProps {
  productId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useSelector((state: RootState) => state.authR);
  const { error } = useSelector((state: RootState) => state.reviewR);

  const handleSubmit = async () => {
    try {
      console.log({
        message: reviewText,
        rate: rating,
        userId: userId,
        productId: productId,
      });
      if (reviewText.trim()) {
        await dispatch(
          reviewActions.createReview({
            message: reviewText,
            rate: rating,
            userId: userId,
            productId: productId,
          })
        ).unwrap();
        setReviewText("");
        setRating(1);
        toast.success("Thank you for your review!");
      } else {
        toast.info("Add review!");
      }
    } catch (errors) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h6' gutterBottom>
        Write a Review
      </Typography>
      <TextField
        label='Review'
        multiline
        rows={4}
        variant='outlined'
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label='Rating (1 to 5)'
        type='number'
        inputProps={{ min: 1, max: 5 }}
        variant='outlined'
        fullWidth
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
