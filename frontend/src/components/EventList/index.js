import { Paper, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import { Box } from '@mui/system';
import { getEvents, postJoinEvent, postShareEvent } from '../../Services';
import Toastbox from '../Toastbox';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router';

const EventList = ({ refresh, setRefresh, date, setDate, searchkey }) => {
  const token = localStorage.getItem('token');
  const [eventData, setEventData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const [openShareModal, setOpenShareModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [friendUsername, setFriendUsername] = useState('');

  const navigate = useNavigate();

  const getEventList = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await getEvents(token, date, searchkey, page, limit);
      if (res.status === 200) {
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setEventData((prevData) => [...prevData, ...res.data]);
        }
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventList();
  }, [refresh, date, page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;

    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleJoinEvent = async (eventId) => {
    try {
      let res = await postJoinEvent(token, eventId);
      if (res.status == 200) {
        Toastbox("success", res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.error || "An unexpected error occurred!";
      Toastbox("error", message);
    }
  };

  const handleViewDetails = (eventId) => {
    navigate('/feed/' + eventId);
  };

  const handleShareEvent = (eventId) => {
    setSelectedEventId(eventId);
    setOpenShareModal(true);
  };

  const handleModalClose = () => {
    setOpenShareModal(false);
    setFriendUsername('');
  };

  const handleShareSubmit = async () => {
    setOpenShareModal(false);
    setFriendUsername('');
    await postShareEventFunc()
  };

  const postShareEventFunc = async() => {
    try {
      let res = await postShareEvent(token,selectedEventId,friendUsername)
      if(res.status == 200){
        Toastbox("success", "Mail send your Friend")
      }
    } catch (error) {
      const message = error.response?.data?.error || "An unexpected error occurred!";
      Toastbox("error", message);
    }
  }

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <EventIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Events
        </Typography>

        <Box
          sx={{
            marginTop: 2,
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
          onScroll={handleScroll}
        >
          {eventData.length > 0 ? (
            eventData.map((item) => (
              <Box
                key={item._id}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {formatDate(item.date)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Organizer: {item.organizer}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleViewDetails(item._id)}>
                    <InfoIcon sx={{ color: 'primary.main' }} />
                  </IconButton>

                  <IconButton onClick={() => handleShareEvent(item._id)}>
                    <ShareIcon sx={{ color: 'primary.main' }} />
                  </IconButton>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleJoinEvent(item._id)}
                    sx={{ height: 'fit-content' }}
                  >
                    Join
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              There are no events yet.
            </Typography>
          )}
          {!hasMore && (
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
              No more events to show.
            </Typography>
          )}
        </Box>
      </Paper>


      <Dialog open={openShareModal} onClose={handleModalClose}>
        <DialogTitle>Share Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="friendUsername"
            label="Friend's Username"
            type="text"
            fullWidth
            variant="outlined"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleShareSubmit} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventList;
