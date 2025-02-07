import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  GetApp as GetAppIcon,
  Share as ShareIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

function TransactionPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          {/* Success Banner */}
          <Box
            sx={{
              bgcolor: "success.light",
              p: 4,
              textAlign: "center",
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 64,
                color: "success.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" color="success.dark" gutterBottom>
              Transfer Successful
            </Typography>
            <Typography color="success.dark">
              Your money has been sent successfully
            </Typography>
          </Box>

          {/* Amount Section */}
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Box>
                <Typography color="text.secondary" variant="subtitle2">
                  Amount Sent
                </Typography>
                <Typography variant="h3" component="h2" fontWeight="bold">
                  $2,500.00
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                  width: 56,
                  height: 56,
                }}
              >
                $
              </Avatar>
            </Box>

            {/* Transfer Path */}
            <Card variant="outlined" sx={{ bgcolor: "grey.50" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 1,
                      bgcolor: "white",
                      color: "text.primary",
                      border: 1,
                      borderColor: "grey.200",
                    }}
                  >
                    JP
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="medium">
                    John Parker
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sender
                  </Typography>
                </Box>
                <ArrowForwardIcon sx={{ color: "text.secondary" }} />
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 1,
                      bgcolor: "white",
                      color: "text.primary",
                      border: 1,
                      borderColor: "grey.200",
                    }}
                  >
                    SR
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Sarah Rodriguez
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Recipient
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Divider />

          {/* Transaction Details */}
          <Box sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Transaction Details
            </Typography>
            <List disablePadding>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary="Transaction ID" />
                <Typography>TRX-89045-23498</Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary="Date & Time" />
                <Typography>March 15, 2024 - 14:30 EST</Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary="Payment Method" />
                <Typography>Bank Transfer (ACH)</Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary="Transfer Fee" />
                <Typography>$0.00</Typography>
              </ListItem>
            </List>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ p: 4, bgcolor: "grey.50" }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GetAppIcon />}
              size="large"
              sx={{ mb: 2 }}
            >
              Download Receipt
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ShareIcon />}
              size="large"
            >
              Share Transfer Details
            </Button>
          </Box>
        </Paper>

        {/* Estimated Time Card */}
        <Card
          variant="outlined"
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            p: 2,
          }}
        >
          <AccessTimeIcon sx={{ color: "primary.main", mr: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Funds will be available in recipient's account within{" "}
            <Box component="span" fontWeight="medium">
              1-2 business days
            </Box>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}

export default TransactionPage;
