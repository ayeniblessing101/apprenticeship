const notifications = [
  {
    type: 'mentorRequest',
    message: {
      title: 'New Mentor Request',
      content: 'Someone has offered to mentor you in HTML and CSS',
    },
    timestamp: 1234335423,
    read: false,
    sender: 'Mr Man',
  },
  {
    type: 'help',
    message: {
      title: 'Help',
      content: 'You need help',
    },
    timestamp: 533454335423,
    read: false,
    sender: 'Mr Man',
  },
  {
    type: 'Support',
    message: {
      title: 'Support From support',
      content: 'You need support',
    },
    timestamp: 533454335423,
    read: false,
    sender: 'Somebody',
  },
  {
    type: 'Added Skill',
    message: {
      title: '',
      content: 'new skiils have been added for you',
    },
    timestamp: 45545323453,
    read: false,
  },
];

export default notifications;
