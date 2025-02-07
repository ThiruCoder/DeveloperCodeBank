import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Sidebar = () => {
  const slideIn = useSpring({
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 500,
  });

  return (
    <animated.div style={slideIn}>
      <nav className="navigation">
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-browsers"></i>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-check-square"></i>
            </ListItemIcon>
            <ListItemText primary="Scheduled" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-swap"></i>
            </ListItemIcon>
            <ListItemText primary="Transfers" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-file-text"></i>
            </ListItemIcon>
            <ListItemText primary="Templates" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-globe"></i>
            </ListItemIcon>
            <ListItemText primary="SWIFT" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <i className="ph-clipboard-text"></i>
            </ListItemIcon>
            <ListItemText primary="Exchange" />
          </ListItem>
        </List>
      </nav>
    </animated.div>
  );
};

export default Sidebar;
