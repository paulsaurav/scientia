import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const PointsTable = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          }
        )
      }

      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 80%',
          animation: gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            }
          ),
          once: true
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Department-wise points calculated from sports, eSports, and cultural events declared so far (see page subtitle for list)
  const departments = [
    { name: 'Computer Science', points: 223 },
    { name: 'Physics', points: 220 },
    { name: 'Life Science & Bioinformatics', points: 180 },
    { name: 'Chemistry', points: 161 },
    { name: 'Pharmaceutical Sciences', points: 90 },
    { name: 'Ecology & Environmental Science', points: 65 },
    { name: 'Statistics', points: 45 },
    { name: 'Biotechnology', points: 52 },
    { name: 'Earth Science', points: 45 },
    { name: 'Mathematics', points: 19 },
    { name: 'Education (B.Sc B.Ed)', points: 34 },
    { name: 'Microbiology', points: 1 },
  ]

  // Event results with points as per Grading System
  const eventResults: {
    eventName: string
    category: string
    positions: { position: string; players: string; department: string; points: number }[]
  }[] = [
    {
      eventName: 'Badminton',
      category: "Women's Singles",
      positions: [
        { position: '1st', players: 'Ankita Kumari Singh', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'K. Archita Singha', department: 'Life Science & Bioinformatics', points: 7 },
        { position: '3rd', players: 'Kriti Yadav', department: 'Ecology & Environmental Science', points: 5 },
      ],
    },
    {
      eventName: 'Badminton',
      category: "Women's Doubles",
      positions: [
        { position: '1st', players: 'Sweta Sutradhar and Sujata Chetri', department: 'Life Science & Bioinformatics', points: 10 },
        { position: '2nd', players: 'K. Archita Singha and Farah Begum', department: 'Life Science & Bioinformatics', points: 7 },
        { position: '3rd', players: 'Kreeti Yadav and Palki Buragohain', department: 'Ecology & Environmental Science', points: 5 },
      ],
    },
    {
      eventName: 'Badminton',
      category: 'Mixed Doubles',
      positions: [
        { position: '1st', players: 'Tyson Singha and Ankita Kumari Singh', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Nilanjan Singha and Hannah Jasmine Selvamalar', department: 'Biotechnology', points: 7 },
        { position: '3rd', players: 'Nahum Lalthouisang Songate and Sujata Chetri', department: 'Life Science & Bioinformatics', points: 5 },
      ],
    },
    {
      eventName: 'Badminton',
      category: "Men's Singles",
      positions: [
        { position: '1st', players: 'Ayush Kumar Yadav', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Rahatuz Zaman Choudhury', department: 'Ecology & Environmental Science', points: 7 },
        { position: '3rd', players: 'Nilanjan Singha', department: 'Biotechnology', points: 5 },
      ],
    },
    {
      eventName: 'Badminton',
      category: "Men's Doubles",
      positions: [
        { position: '1st', players: 'Ayush Kumar Yadav and Tyson Singha', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Amit Ramchiary and Mongve BB', department: 'Chemistry', points: 7 },
        { position: '3rd', players: 'Mayur Bhusan Handique and Ch Malem Ngamba Singha', department: 'Pharmaceutical Sciences', points: 5 },
      ],
    },
    {
      eventName: 'Football',
      category: "Women's",
      positions: [
        { position: '1st', players: 'Team', department: 'Physics', points: 15 },
        { position: '2nd', players: 'Team', department: 'Life Science & Bioinformatics', points: 10 },
        { position: '3rd', players: 'Team', department: 'Computer Science', points: 7 },
      ],
    },
    {
      eventName: 'Football',
      category: "Men's",
      positions: [
        { position: '1st', players: 'Team', department: 'Computer Science', points: 15 },
        { position: '2nd', players: 'Team', department: 'Ecology & Environmental Science', points: 10 },
        {
          position: '3rd',
          players: 'Team',
          department: 'Pharmaceutical Sciences & Life Science & Bioinformatics',
          points: 7,
        },
      ],
    },
    {
      eventName: 'Cricket',
      category: "Men's",
      positions: [
        { position: '1st', players: 'Team', department: 'Life Science & Bioinformatics', points: 15 },
        { position: '2nd', players: 'Team', department: 'Chemistry', points: 10 },
        { position: '3rd', players: 'Team', department: 'Statistics', points: 7 },
      ],
    },
    {
      eventName: 'Cricket',
      category: "Women's",
      positions: [
        { position: '1st', players: 'Team', department: 'Statistics', points: 15 },
        { position: '2nd', players: 'Team', department: 'Life Science & Bioinformatics', points: 10 },
        { position: '3rd', players: 'Team', department: 'Computer Science', points: 7 },
      ],
    },
    {
      eventName: 'Volleyball',
      category: "Women's",
      positions: [
        { position: '1st', players: 'Team', department: 'Chemistry', points: 15 },
        { position: '2nd', players: 'Team', department: 'Pharmaceutical Sciences', points: 10 },
        { position: '3rd', players: 'Team', department: 'Earth Science', points: 7 },
      ],
    },
    {
      eventName: 'Volleyball',
      category: "Men's",
      positions: [
        { position: '1st', players: 'Team', department: 'Pharmaceutical Sciences', points: 15 },
        { position: '2nd', players: 'Team', department: 'Computer Science', points: 10 },
        { position: '3rd', players: 'Team', department: 'Chemistry', points: 7 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Women's Singles",
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Soraisam Brinda Dzongri', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Limarika Gogoi', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Women's Doubles",
      positions: [
        {
          position: '1st',
          players: 'Soraisam Brinda Dzongri and Monoswini Chakravorty',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Monorama Kalowar and Chandana Amphi',
          department: 'Physics',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Ankita Kumari Singh and Jachobed Klarmir Hansepi',
          department: 'Computer Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Men's Singles",
      positions: [
        { position: '1st', players: 'Anuj Kanti Nath', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Sushil Kumar Sharma', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Akshay Acharya Chakma', department: 'Education (B.Sc B.Ed)', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Men's Doubles",
      positions: [
        {
          position: '1st',
          players: 'Anuj Kanti Nath and Nakemuz Zaman Barbhuiya',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Sushil Kumar Sharma and Debojit Das',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Anurag Das and Aryan Jena',
          department: 'Biotechnology',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: 'Mixed Doubles',
      positions: [
        {
          position: '1st',
          players: 'Anuj Kanti Nath and Monoswini Chakraborty',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Debojit Das and Jacobed Klarmir Hansepi',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Sushil Kumar Sharma and Ankita Kumari Singh',
          department: 'Computer Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Chess',
      category: 'Singles',
      positions: [
        {
          position: '1st',
          players: 'Tarun Kumar Sinha',
          department: 'Life Science & Bioinformatics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Atanu Roy',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Biki Prasad',
          department: 'Physics',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Carrom',
      category: "Men's Doubles",
      positions: [
        {
          position: '1st',
          players: 'Aman Das and Neithoi Lalneiphoi Pena',
          department: 'Ecology & Environmental Science',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Giriraj Yadav and Pradeep Dhar',
          department: 'Physics',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Hriishikesh Kano and Najdid Hussain',
          department: 'Chemistry',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Carrom',
      category: "Women's Doubles",
      positions: [
        {
          position: '1st',
          players: 'Mayashree Basumatary and Rashmita Das',
          department: 'Pharmaceutical Sciences',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Swagata Barman and M. Sushmita Singha',
          department: 'Physics',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Dipanjali Roy and Jannat Yasmin Laskar',
          department: 'Life Science & Bioinformatics',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Carrom',
      category: 'Mixed Doubles',
      positions: [
        {
          position: '1st',
          players: 'Giriraj Yadav and Swagata Barman',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Sushil Kumar Sharma and Jachobed Klarmin Hensapi',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Rashmita Das and Deepjyoti Talukdar',
          department: 'Pharmaceutical Sciences',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Girls 41–50kg',
      positions: [
        {
          position: '1st',
          players: 'Monoswini Chakravorty',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Ishika Agarwal',
          department: 'Pharmaceutical Sciences',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Jannat Yasmin Laskar',
          department: 'Life Science & Bioinformatics',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Girls 51–60kg',
      positions: [
        {
          position: '1st',
          players: 'Achal Chakravorty',
          department: 'Chemistry',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Matyaben Yasmin',
          department: 'Chemistry',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Parishmita Gogoi',
          department: 'Earth Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Girls 61–70kg',
      positions: [
        {
          position: '1st',
          players: 'Monoswini Chakravorty',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Kanchan Chettri',
          department: 'Earth Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Matyaben Yasmin',
          department: 'Chemistry',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Girls 70kg+',
      positions: [
        {
          position: '1st',
          players: 'Monoswini Chakravorty',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Simran Thapa',
          department: 'Ecology & Environmental Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Nargis Khanam Laskar',
          department: 'Ecology & Environmental Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Boys 55–65kg',
      positions: [
        {
          position: '1st',
          players: 'Broteen Nath',
          department: 'Computer Science',
          points: 10,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Boys 65–75kg',
      positions: [
        {
          position: '1st',
          players: 'Debasis Boruah',
          department: 'Chemistry',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Archit Changkakoti',
          department: 'Physics',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Akashjyoti Dutta',
          department: 'Chemistry',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Boys 76–85kg',
      positions: [
        {
          position: '1st',
          players: 'Sapam Dushanta Singh',
          department: 'Computer Science',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Bhrigu Kr. Das',
          department: 'Physics',
          points: 7,
        },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: 'Boys 85kg+',
      positions: [
        {
          position: '1st',
          players: 'Debodeep Bhattacharjee',
          department: 'Life Science & Bioinformatics',
          points: 10,
        },
      ],
    },
    {
      eventName: 'Tekken',
      category: 'PC Tournament',
      positions: [
        {
          position: '1st',
          players: 'Siddhant Biswas',
          department: 'Computer Science',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Deepak Singha',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Amrit Dey',
          department: 'Earth Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'NFS-MW',
      category: 'PC Tournament',
      positions: [
        {
          position: '1st',
          players: 'Hrishikesh Sarma',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Nibir Gogoi',
          department: 'Earth Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Geetaraj Dutta',
          department: 'Chemistry',
          points: 5,
        },
      ],
    },
    {
      eventName: 'FIFA',
      category: 'PC Tournament',
      positions: [
        {
          position: '1st',
          players: 'Siddhant Biswas',
          department: 'Computer Science',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Debajit Paul',
          department: 'Computer Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Geetaraj Dutta',
          department: 'Chemistry',
          points: 5,
        },
      ],
    },
    {
      eventName: 'eFootball',
      category: 'PC Tournament',
      positions: [
        {
          position: '1st',
          players: 'Samir Saha',
          department: 'Physics',
          points: 10,
        },
        {
          position: '2nd',
          players: 'Amrit Dey',
          department: 'Earth Science',
          points: 7,
        },
        {
          position: '3rd',
          players: 'Jyotiraditya Baruah',
          department: 'Earth Science',
          points: 5,
        },
      ],
    },
    {
      eventName: 'Relay Race',
      category: 'Girls',
      positions: [
        {
          position: '1st',
          players: 'Chandana Amphi, Soraisam Brinda Dzongri, Dipana Barman, Monoswini Chakraborty',
          department: 'Physics',
          points: 15,
        },
        {
          position: '2nd',
          players: 'Jannat Yasmin Laskar, Shweta Nath, L. Bijaita Singha, A. Bichitra',
          department: 'Life Science & Bioinformatics',
          points: 10,
        },
        {
          position: '3rd',
          players: 'Krishtina Baruah, Afruza Hussain, Biponshi Borah, Satarupa Sil',
          department: 'Statistics',
          points: 7,
        },
      ],
    },
    {
      eventName: 'Relay Race',
      category: 'Boys',
      positions: [
        {
          position: '1st',
          players: 'Suyansh Timsina, Alfred Lalrochan, Bidyasagar Ree, Soibam Ashokumar Meitei',
          department: 'Computer Science',
          points: 15,
        },
        {
          position: '2nd',
          players: 'Sidhartha Deb, Subhasis Roy, Biswajit Baruah, Ankurjyoti Bora',
          department: 'Mathematics',
          points: 10,
        },
        {
          position: '3rd',
          players: 'Riajul Haque Laskar, Bagmin Phukon, Debashis Boruah, Thirbuljem Hrangkhol',
          department: 'Chemistry',
          points: 7,
        },
      ],
    },
    {
      eventName: 'MLBB',
      category: 'eSports Tournament',
      positions: [
        {
          position: '1st',
          players: 'Mousam Ray, Debobrata Chanda, Th. Subham Singha, Dhanraj Singha, Abhijit Sharma',
          department: 'Education (B.Sc B.Ed)',
          points: 15,
        },
        {
          position: '2nd',
          players: 'Snehashish Das, K. Biswajit Singha, Tuhin Paul, Uday Singha, Aman Fandembam',
          department: 'Computer Science',
          points: 10,
        },
        {
          position: '3rd',
          players: 'Swaprakash Paul, Raj Kishore Das, Anupam Upadhyaya, Sidhu Roy, Barsodi Thousen',
          department: 'Life Science & Bioinformatics',
          points: 7,
        },
      ],
    },
    {
      eventName: 'Solo Singing',
      category: 'Category A (Classical / Rabindra / Najrul)',
      positions: [
        { position: '1st', players: 'Nabaneet Das', department: 'Chemistry', points: 10 },
        { position: '2nd', players: 'Nibedita Choudhury', department: 'Ecology & Environmental Science', points: 7 },
        { position: '3rd', players: 'Sorbomita Chakraborty', department: 'Biotechnology', points: 5 },
        { position: 'Participation', players: 'Sourav Choudhury', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Sahidur Barbhuiya', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Susmita Chakraborty', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Rochoita Dey', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Mousam Ray', department: 'Education (B.Sc B.Ed)', points: 1 },
        { position: 'Participation', players: 'Tarun Kumar Sinha', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Trishita Suklabaidya', department: 'Pharmaceutical Sciences', points: 1 },
        { position: 'Participation', players: 'Riya Nath', department: 'Education (B.Sc B.Ed)', points: 1 },
        { position: 'Participation', players: 'Smita Dutta', department: 'Computer Science', points: 1 },
      ],
    },
    {
      eventName: 'Solo Singing',
      category: 'Category B (Modern / Folk)',
      positions: [
        { position: '1st', players: 'Nabaneet Das', department: 'Chemistry', points: 10 },
        { position: '2nd', players: 'Subhangi Paul', department: 'Statistics', points: 7 },
        { position: '3rd', players: 'Satarupa Sil', department: 'Statistics', points: 5 },
        { position: 'Participation', players: 'Geetaraj Dutta', department: 'Chemistry', points: 1 },
        { position: 'Participation', players: 'Supratim Barbhuiya', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Nibedita Choudhury', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Sudipta Goswami', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'Sumit Sarma', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'Saptadeep Nath', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Mousam Ray', department: 'Education (B.Sc B.Ed)', points: 1 },
        { position: 'Participation', players: 'Riya Nath', department: 'Education (B.Sc B.Ed)', points: 1 },
        { position: 'Participation', players: 'Tarun Kumar Sinha', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Nomi Das', department: 'Pharmaceutical Sciences', points: 1 },
        { position: 'Participation', players: 'Manabina Nath', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Shivanki Roy', department: 'Earth Science', points: 1 },
        { position: 'Participation', players: 'Suraj Acharjee', department: 'Pharmaceutical Sciences', points: 1 },
        { position: 'Participation', players: 'Susmita Suklabaidya', department: 'Computer Science', points: 1 },
      ],
    },
    {
      eventName: 'Solo Dancing',
      category: 'Semi Classical',
      positions: [
        { position: '1st', players: 'Sukanya Dutta', department: 'Pharmaceutical Sciences', points: 10 },
        { position: '2nd', players: 'Tonu Balmiki', department: 'Life Science & Bioinformatics', points: 7 },
        { position: '3rd', players: 'Monoswini Chakravorty', department: 'Physics', points: 5 },
        { position: 'Participation', players: 'Suchismita Sen', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'Lipsha Pradhan', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Debadrita Kar', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Sahani Laskar', department: 'Microbiology', points: 1 },
      ],
    },
    {
      eventName: 'Solo Dancing',
      category: 'Modern',
      positions: [
        { position: '1st', players: 'Dipshika Nath', department: 'Chemistry', points: 10 },
        { position: '2nd', players: 'Nilanzana Upadhaya', department: 'Pharmaceutical Sciences', points: 7 },
        { position: '3rd', players: 'Monashree Das', department: 'Computer Science', points: 5 },
        { position: 'Participation', players: 'Brahma Jyoti Sinha', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'M. Susmita Singha', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Soraisam Brinda Dzongri', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Sahidur Rohman Barbhuiya', department: 'Ecology & Environmental Science', points: 1 },
      ],
    },
    {
      eventName: 'Group Dance',
      category: 'Department Teams',
      positions: [
        { position: '1st', players: 'Team', department: 'Chemistry', points: 15 },
        { position: '2nd', players: 'Team', department: 'Pharmaceutical Sciences', points: 10 },
        { position: '3rd', players: 'Team', department: 'Physics', points: 7 },
        { position: 'Participation', players: 'Team', department: 'Mathematics', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Biotechnology', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Computer Science', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Life Science & Bioinformatics', points: 2 },
      ],
    },
    {
      eventName: 'Mr. & Miss Scientia 6.0',
      category: 'Pageant',
      positions: [
        { position: 'Mr. — 1st', players: 'Brahma Jyoti Sinha', department: 'Biotechnology', points: 10 },
        { position: 'Miss — 1st', players: 'Tanushree Roy', department: 'Life Science & Bioinformatics', points: 10 },
        { position: 'Participation', players: 'Parishmita Gogoi (Miss)', department: 'Earth Science', points: 1 },
        { position: 'Participation', players: 'Manabina Nath (Miss)', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Shayni Paul (Miss)', department: 'Computer Science', points: 1 },
        { position: 'Participation', players: 'VSP Bobbie (Mr.)', department: 'Computer Science', points: 1 },
        { position: 'Participation', players: 'Sagar Barman (Mr.)', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Hrishikesh Saikia (Mr.)', department: 'Chemistry', points: 1 },
        { position: 'Participation', players: 'Rishab Ranjan Roy (Mr.)', department: 'Physics', points: 1 },
      ],
    },
    {
      eventName: 'Poster Presentation',
      category: 'Individual Event',
      positions: [
        { position: '1st', players: 'Mriganka Das', department: 'Life Science & Bioinformatics', points: 10 },
        { position: '2nd', players: 'Barsa Pal', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Dipika Nath', department: 'Chemistry', points: 5 },
        { position: '3rd', players: 'Mahabrata Sengupta', department: 'Chemistry', points: 5 },
        { position: 'Participation', players: 'Abhijit Mishra', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Anurag Das', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'Niranjan Singha', department: 'Biotechnology', points: 1 },
        { position: 'Participation', players: 'Yahasvi Raj', department: 'Computer Science', points: 1 },
        { position: 'Participation', players: 'Shibasish Bhattacharjee', department: 'Computer Science', points: 1 },
        { position: 'Participation', players: 'Binita Singha', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Sahaj Begum', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Nargis Khanam', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Tanmayjit', department: 'Pharmaceutical Sciences', points: 1 },
        { position: 'Participation', players: 'Saptadeep Nath', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Sabyasachi Roy', department: 'Physics', points: 1 },
        { position: 'Participation', players: 'Afroza Hanam', department: 'Statistics', points: 1 },
        { position: 'Participation', players: 'Anindita Krishna', department: 'Statistics', points: 1 },
      ],
    },
    {
      eventName: 'Oral Presentation',
      category: 'Individual Event',
      positions: [
        { position: '1st', players: 'Tamim Ahmed', department: 'Life Science & Bioinformatics', points: 10 },
        { position: '2nd', players: 'Juktamoni Gautam', department: 'Mathematics', points: 7 },
        { position: '3rd', players: 'Pallavi Gupta', department: 'Biotechnology', points: 5 },
        { position: 'Participation', players: 'Padmashree Rabha', department: 'Chemistry', points: 1 },
        { position: 'Participation', players: 'Debajit Paul', department: 'Life Science & Bioinformatics', points: 1 },
        { position: 'Participation', players: 'Premangini Basumatary', department: 'Ecology & Environmental Science', points: 1 },
        { position: 'Participation', players: 'Bhaskarjyoti', department: 'Physics', points: 1 },
      ],
    },
    {
      eventName: 'Model Presentation',
      category: 'Team Event (Group)',
      positions: [
        { position: '1st', players: 'Team', department: 'Life Science & Bioinformatics', points: 15 },
        { position: '2nd', players: 'Team', department: 'Education (B.Sc B.Ed)', points: 10 },
        { position: '3rd', players: 'Team', department: 'Biotechnology', points: 7 },
        { position: 'Participation', players: 'Team', department: 'Computer Science', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Ecology & Environmental Science', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Physics', points: 2 },
        { position: 'Participation', players: 'Team', department: 'Statistics', points: 2 },
      ],
    },
  ]

  const priorityAcademicResults = eventResults.filter(
    (r) => r.eventName === 'Poster Presentation' || r.eventName === 'Oral Presentation'
  )
  const otherEventResults = eventResults.filter(
    (r) => r.eventName !== 'Poster Presentation' && r.eventName !== 'Oral Presentation'
  )

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Points Table
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">Quick reference for department standings and event results.</p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-12">
            {/* Department-wise Points */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">Departments (Standings So Far)</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Points are calculated from Badminton, Football, Cricket, Table Tennis, Volleyball, Chess, Carrom, Powerlifting, Tekken, NFS-MW, FIFA, eFootball, Relay Race, MLBB, Solo Singing (Categories A and B), Solo Dancing (Semi Classical and Modern), Group Dance, Mr. and Miss Scientia 6.0, Poster Presentation, Oral Presentation, and Model Presentation results so far, using the Grading System.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Department</th>
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide text-right w-28">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[...departments]
                      .sort((a, b) => b.points - a.points)
                      .map((row, i) => (
                        <tr key={i} className="border-b border-slate-700/30 last:border-0">
                          <td className="px-6 py-4">{row.name}</td>
                          <td className="px-6 py-4 text-right font-semibold text-white">{row.points}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Event Results - event names and player names */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">Event Results</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Poster Presentation and Oral Presentation are shown first below. Participation rows are worth{' '}
                  <span className="text-slate-300 font-medium">1 pt</span> each (Individual events) and are included in department totals. Other events follow under &quot;All other events&quot;.
                </p>
              </div>
              <div className="p-4 md:p-6 space-y-8">
                {/* Poster & Oral presentation first — individual events; easy to find */}
                {priorityAcademicResults.map((result, idx) => (
                  <div
                    key={`academic-${result.eventName}-${idx}`}
                    className="rounded-xl border-2 border-emerald-500/50 bg-emerald-950/25 shadow-lg shadow-emerald-900/20"
                  >
                    <div className="px-4 py-3 border-b border-emerald-500/30 bg-emerald-900/20 md:px-5">
                      <h3 className="text-lg font-bold text-emerald-300 md:text-xl">
                        {result.eventName}
                      </h3>
                      <p className="text-sm text-emerald-200/80 mt-0.5">{result.category}</p>
                    </div>
                    <div className="overflow-x-auto p-4 md:p-5">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-700/50 bg-slate-800/40">
                            <th className="px-4 py-2.5 font-semibold text-slate-300">Position</th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300">
                              {result.eventName === 'Poster Presentation' ? 'Presenters' : 'Name'}
                            </th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300">Department</th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300 text-right w-20">Points</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-400">
                          {result.positions.map((row, i) => (
                            <tr key={i} className="border-b border-slate-700/30 last:border-0">
                              <td className="px-4 py-3 font-medium text-white">{row.position}</td>
                              <td className="px-4 py-3">{row.players}</td>
                              <td className="px-4 py-3">{row.department}</td>
                              <td className="px-4 py-3 text-right font-medium text-cyan-400">{row.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
                    All other events
                  </h3>
                  <div className="space-y-8">
                    {otherEventResults.map((result, idx) => (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                          {result.eventName} — {result.category}
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-slate-700/40">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                <th className="px-4 py-2.5 font-semibold text-slate-300">Position</th>
                                <th className="px-4 py-2.5 font-semibold text-slate-300">Players</th>
                                <th className="px-4 py-2.5 font-semibold text-slate-300">Department</th>
                                <th className="px-4 py-2.5 font-semibold text-slate-300 text-right w-20">Points</th>
                              </tr>
                            </thead>
                            <tbody className="text-slate-400">
                              {result.positions.map((row, i) => (
                                <tr key={i} className="border-b border-slate-700/30 last:border-0">
                                  <td className="px-4 py-3 font-medium text-white">{row.position}</td>
                                  <td className="px-4 py-3">{row.players}</td>
                                  <td className="px-4 py-3">{row.department}</td>
                                  <td className="px-4 py-3 text-right font-medium text-cyan-400">{row.points}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm">
              For full rules, tie-breaking, and score calculation, see the{' '}
              <Link to="/grading-system" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Grading System
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PointsTable
