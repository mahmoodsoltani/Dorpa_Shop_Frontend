import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";

import { ReviewListProps } from "../../type/propsType";

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <List>
      {reviews.length == 0 && <span>Be the first one to write a review!</span>}
      {reviews.map((review, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={
              <Typography variant='subtitle1'>
                <Rating value={review.rate} readOnly />
              </Typography>
            }
            secondary={review.message}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ReviewList;
