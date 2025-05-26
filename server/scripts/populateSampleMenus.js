const mongoose = require('mongoose');
const Menu = require('../models/Menu');
require('dotenv').config({ path: '../.env' });

const sampleMenus = [
  // Monday
  {
    day: 'Monday',
    mealType: 'Breakfast',
    items: [
      'Plain Idli + Fried Idli',
      'Coconut Chutney',
      'Sambar',
      'Onion Chutney',
      'Palli Podi',
      'Ghee',
      'Horlicks',
      'Mixed Sprouts'
    ]
  },
  {
    day: 'Monday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Dal Tadka',
      'Mor Kulambu',
      'White Matar Masala (Week 1/3) / Methi Matar Malai (Week 2/4)',
      'Bhendi Tawa Fry with Peanut Fry',
      'Muskmelon (Week 1/3) / Watermelon (Week 2/4)'
    ]
  },
  {
    day: 'Monday',
    mealType: 'Snacks',
    items: [
      'Plain Tea / Elaichi Tea'
    ]
  },
  {
    day: 'Monday',
    mealType: 'Dinner',
    items: [
      'Ghee + Plain Roti',
      'Dal Makhani',
      'Dry Matar-Cabbage (Week 1/3) / Beans Poriyal (Week 2/4)',
      'Aloo Capsicum Curry',
      'Plain Rasam',
      'Lassi',
      'Tomato Chutney'
    ]
  },

  // Tuesday
  {
    day: 'Tuesday',
    mealType: 'Breakfast',
    items: [
      'Vada',
      'Sambar',
      'Peanut Chutney',
      'Ginger Chutney',
      'Pongal (Week 1/3) / Rava Upma (Week 2/4)',
      'Boost',
      'Sprouts'
    ]
  },
  {
    day: 'Tuesday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Rajma',
      'Radish Sambar',
      'Gutti Vankaya (Brinjal Curry)',
      'Beetroot Coconut Poriyal'
    ]
  },
  {
    day: 'Tuesday',
    mealType: 'Snacks',
    items: [
      'Plain Tea / Lemon Mint Tea (without Milk)'
    ]
  },
  {
    day: 'Tuesday',
    mealType: 'Dinner',
    items: [
      'Ghee + Plain Roti',
      'Dal Lahsuni Tadka',
      'Soya Chilli (Dry)',
      'Veg Manchurian (Week 1/3) / Lauki Channa Dal (Week 2/4)',
      'Pepper Rasam',
      'Veg Fried Rice (Week 1/3) / Lemon Rice with Peanuts (Week 2/4)',
      'Gulab Jamun (Week 1/3) / Ravva Kesari (Week 2/4)',
      'Dosakaya Chutney'
    ]
  },

  // Wednesday
  {
    day: 'Wednesday',
    mealType: 'Breakfast',
    items: [
      'Pesarattu with Onions (Week 1/3) / Kal Dosa + Kadala Curry (Week 2/4)',
      'Ginger Chutney',
      'Peanut Chutney',
      'Sambar',
      'Kobbari Podi',
      'Bournvita',
      'Boiled Peanut'
    ]
  },
  {
    day: 'Wednesday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Tomato Dal',
      'Keerai Sambar',
      'Kabuli Chana Mixed Vegetable Curry',
      'French Beans/Carrot/Matar Sabji (Equal Mix)',
      'Papaya (Week 1/3) / Pineapple (Week 2/4)'
    ]
  },
  {
    day: 'Wednesday',
    mealType: 'Snacks',
    items: [
      'Plain Tea / Cardamom Tea'
    ]
  },
  {
    day: 'Wednesday',
    mealType: 'Dinner',
    items: [
      'Ghee + Plain Roti',
      'Mix Dal (Moong, Masoor, Chana)',
      'Bharwa Baingan',
      'Chettinad Egg Curry / Methi Malai Matar Paneer (Week 1/3)',
      'Pepper Egg Curry / Palak Paneer (Week 2/4)',
      'Tomato Rasam',
      'Boondi Raita',
      'Mirchi ka Thecha'
    ]
  },

  // Thursday
  {
    day: 'Thursday',
    mealType: 'Breakfast',
    items: [
      'Plain Paratha',
      'Jeera Aloo (Week 1/3) / Veg Korma (Week 2/4)',
      'Pickle',
      'Chopped Onions',
      'Horlicks',
      'Boiled Corn'
    ]
  },
  {
    day: 'Thursday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Mango Dal',
      'Drumstick Sambar',
      'Corn Palak',
      'Aloo 65 (Week 1/3) / Cabbage 65 (Week 2/4)'
    ]
  },
  {
    day: 'Thursday',
    mealType: 'Snacks',
    items: [
      'Plain Tea / Ginger Tea'
    ]
  },
  {
    day: 'Thursday',
    mealType: 'Dinner',
    items: [
      'Ghee + Plain Roti',
      'Rajma',
      'Veg Jaipuri (Week 1/3) / Veg Tawa Sabji (Week 2/4)',
      'Chamagadda Pulusu (Week 1/3) / Veg Kofta (Week 2/4)',
      'Pappu Charu',
      'Bisi Bele Bath with Boondi (Week 1/3) / Maharashtrian Pav Bhaji Pulao (Week 2/4)',
      'Gajar Halwa (Week 1/3) / Rasmalai (Week 2/4)',
      'Ginger Chutney'
    ]
  },

  // Friday
  {
    day: 'Friday',
    mealType: 'Breakfast',
    items: [
      'Sev Poha + Mysore Bajji (Week 1/3)',
      'Semiya Upma + Aloo Bonda (Week 2/4)',
      'Peanut Chutney',
      'Boost',
      'Boiled Green Gram with Tadka'
    ]
  },
  {
    day: 'Friday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Masoor Dal',
      'Pumpkin Sambar',
      'Onion Tomato Curry',
      'Cluster Beans Fry (Week 1/3) / Bengali Sosarting Fry (Week 2/4)',
      'Fruit Salad (Week 1/3) / Fruit Custard (Week 2/4)'
    ]
  },
  {
    day: 'Friday',
    mealType: 'Snacks',
    items: [
      'Tea / Black Tea (Without Milk)'
    ]
  },
  {
    day: 'Friday',
    mealType: 'Dinner',
    items: [
      'Ghee + Plain Roti',
      'Moong + Palak Dal',
      'Bhindi Do Pyaza',
      'Anda Curry / Kadhai Paneer (Week 1/3)',
      'Boiled Egg Fry / Paneer Kolhapuri (Week 2/4)',
      'Garlic Rasam',
      'Jeera Mint Raita',
      'Fresh Gongura Chutney'
    ]
  },

  // Saturday
  {
    day: 'Saturday',
    mealType: 'Breakfast',
    items: [
      'Onion Paratha (Week 1/3) / Aloo Paratha (Week 2/4)',
      'Pudina Chutney',
      'Curd',
      'Butter',
      'Mix Veg Pickle',
      'Bournvita',
      'Boiled Chana with Tadka'
    ]
  },
  {
    day: 'Saturday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Dal Makhani',
      'Mixed Veg Sambar',
      'Baingan Bharta',
      'Kerala Olan'
    ]
  },
  {
    day: 'Saturday',
    mealType: 'Snacks',
    items: [
      'Cardamom Tea / Lemon Mint Tea (without Milk)'
    ]
  },
  {
    day: 'Saturday',
    mealType: 'Dinner',
    items: [
      'Toor Dal / Arhar Dal',
      'Masala Aloo (Dry)',
      'Chole Curry',
      'Bhatura',
      'White Rasgulla (Week 1/3) / Sevaiyan ki Kheer with Jaggery (Week 2/4)',
      'Mint & Pudina Chutney'
    ]
  },

  // Sunday
  {
    day: 'Sunday',
    mealType: 'Breakfast',
    items: [
      'Masala Dosa',
      'Peanut Chutney',
      'Mixed Veg Sambar',
      'Tomato Chutney',
      'Coconut Chutney',
      'Ghee',
      'Podi',
      'Bournvita',
      'Boiled Corn'
    ]
  },
  {
    day: 'Sunday',
    mealType: 'Lunch',
    items: [
      'Ghee + Plain Roti',
      'Palak Dal',
      'Onion Sambar',
      'Kadi Pakoda (Week 1/3) / Palak Kadi Pakoda (Week 2/4)',
      'Raw Banana Fry',
      'Curd Rice'
    ]
  },
  {
    day: 'Sunday',
    mealType: 'Snacks',
    items: [
      'Plain Tea / Ginger Tea'
    ]
  },
  {
    day: 'Sunday',
    mealType: 'Dinner',
    items: [
      'Plain Roti',
      'Toor/Arhar Dal',
      'Mirch ka Salan (Add-on for Biryani)',
      'Veg Korma',
      'Lemon Coriander Rasam',
      'Chicken Dum Biryani / Paneer Dum Biryani',
      'Onion Raita',
      'Dal Podi + Ghee'
    ]
  }
];

const populateMenus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Menu.deleteMany();
    await Menu.insertMany(sampleMenus);

    console.log('Sample menus populated successfully');
  } catch (err) {
    console.error('Error populating menus:', err);
  } finally {
    await mongoose.disconnect();
  }
};

populateMenus();
