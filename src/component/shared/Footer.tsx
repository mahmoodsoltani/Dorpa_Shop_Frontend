import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#343a40", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' sx={{ marginBottom: "20px" }}>
              Quick Links
            </Typography>
            <Link
              href='/about'
              color='inherit'
              underline='hover'
              sx={{ display: "block", marginBottom: "10px" }}
            >
              About Us
            </Link>
            <Link
              href='/contact'
              color='inherit'
              underline='hover'
              sx={{ display: "block", marginBottom: "10px" }}
            >
              Contact
            </Link>
            <Link
              href='/product'
              color='inherit'
              underline='hover'
              sx={{ display: "block", marginBottom: "10px" }}
            >
              Shop
            </Link>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography variant='h6' sx={{ marginBottom: "20px" }}>
              BikeClub
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: "20px" }}>
              Subscribe to Our Newsletter
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <TextField
                variant='outlined'
                placeholder='Your email address'
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              />
              <Button
                variant='contained'
                color='primary'
                sx={{ backgroundColor: "#ff5722" }}
              >
                Sign Up
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton color='inherit'>
                <TwitterIcon />
              </IconButton>
              <IconButton color='inherit'>
                <FacebookIcon />
              </IconButton>
              <IconButton color='inherit'>
                <PinterestIcon />
              </IconButton>
              <IconButton color='inherit'>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant='h6' sx={{ marginBottom: "20px" }}>
              Contact Us
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: "10px" }}>
              Email: Mahmoud.soltani@gmail.com
            </Typography>
            <Typography variant='body2'>Phone: +385 417215031</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
