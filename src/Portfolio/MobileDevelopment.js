/**
 * Mobile Development Portfolio Projects
 * Real mobile apps — data sourced from https://github.com/TaniiSR/Portfolio
 */

const RAW = "https://raw.githubusercontent.com/TaniiSR/Portfolio/main/Images";

const MobileDevelopment = [
  {
    id: "md-1",
    slug: "mindvalley",
    title: "Mindvalley: Self Improvement",
    category: "Mobile Development",
    platform: "Android",
    role: "Senior Android Developer",
    url: "https://play.google.com/store/apps/details?id=com.mindvalley.mva&hl=en",
    image: `${RAW}/Mindvalley/01.jpg`,
    description:
      "A transformational learning app offering self-help courses, meditation programs, and daily motivation sessions for personal growth and wellness.",
    fullDescription:
      "Mindvalley is a transformational learning app offering self-help courses, meditation programs, and daily motivation sessions for personal growth and wellness. It empowers users to explore themes like spirituality, self-care, confidence building, and mindset development through engaging video content and guided experiences. Built using modern development principles such as MVVM architecture, Kotlin Coroutines, Jetpack libraries, and a modular structure for scalability and maintainability. The app supports dynamic content delivery, rich media playback, daily tasks/reminders, and user progress tracking. It features seamless UI built with Jetpack Compose and XML, with animations and responsive layouts designed for both phones and tablets. CI/CD pipelines are automated using Fastlane and GitHub Actions for efficient deployment.",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "MVVM",
      "Dagger Hilt",
      "Kotlin Coroutines",
      "Firebase",
      "Lottie Animations",
      "Glide",
      "GoogleMaps",
      "Modular Architecture",
      "CI/CD Bitrise",
      "SSL Pinning",
      "Push Notifications",
      "Payment Gateways",
      "TDD",
      "JUnit",
    ],
    features: [
      "Self-help courses & meditation programs",
      "Daily motivation & reminders",
      "Rich video content playback",
      "User progress tracking",
      "Personalized course recommendations",
      "Tablet & phone responsive layouts",
      "Smooth onboarding experience",
      "Dynamic content delivery",
    ],
    challenge:
      "Delivering a rich media-heavy experience with seamless performance across a wide range of Android devices, while maintaining strict modular architecture for a large team of developers.",
    solution:
      "Implemented a scalable modular architecture with Dagger Hilt for dependency injection, Kotlin Coroutines for async operations, and Jetpack Compose for modern UI. Automated CI/CD pipelines with Bitrise ensured consistent deployment quality.",
    gallery: [
      `${RAW}/Mindvalley/01.jpg`,
      `${RAW}/Mindvalley/02.jpg`,
      `${RAW}/Mindvalley/03.jpg`,
      `${RAW}/Mindvalley/04.webp`,
      `${RAW}/Mindvalley/05.webp`,
      `${RAW}/Mindvalley/06.webp`,
      `${RAW}/Mindvalley/07.webp`,
      `${RAW}/Mindvalley/08.webp`,
      `${RAW}/Mindvalley/09.webp`,
      `${RAW}/Mindvalley/10.webp`,
      `${RAW}/Mindvalley/11.webp`,
      `${RAW}/Mindvalley/12.webp`,
      `${RAW}/Mindvalley/13.webp`,
      `${RAW}/Mindvalley/14.webp`,
      `${RAW}/Mindvalley/15.webp`,
      `${RAW}/Mindvalley/16.webp`,
    ],
  },
  {
    id: "md-2",
    slug: "vowpay",
    title: "VowPay",
    category: "Mobile Development",
    platform: "Android",
    role: "Android Developer",
    url: "https://play.google.com/store/apps/details?id=com.vowpay.vowpay",
    image: `${RAW}/VowPay/01.jpg`,
    description:
      "A secure and intuitive mobile payment application enabling fast, reliable money transfers and financial management for everyday users.",
    fullDescription:
      "VowPay is a feature-rich mobile payment application designed to make financial transactions seamless and secure. The app provides users with the ability to send, receive, and manage money on the go, with a clean and intuitive interface. Built with a strong focus on security (SSL Pinning, authentication) and performance, VowPay delivers a trustworthy financial experience.",
    technologies: [
      "Kotlin",
      "MVVM",
      "Retrofit",
      "Payment Gateways",
      "SSL Pinning",
      "Authentication",
      "Firebase",
      "Push Notifications",
      "Room Database",
      "Coroutines",
    ],
    features: [
      "Instant money transfers",
      "Secure authentication & SSL pinning",
      "Transaction history & management",
      "Push notifications for transactions",
      "Clean, intuitive UI",
      "Multi-currency support",
    ],
    challenge:
      "Ensuring top-tier security for financial transactions while maintaining a smooth, user-friendly experience with minimal friction in the payment flow.",
    solution:
      "Implemented SSL pinning and robust authentication flows to safeguard transactions, combined with a streamlined UX design that minimizes steps in the payment journey.",
    gallery: [
      `${RAW}/VowPay/01.jpg`,
      `${RAW}/VowPay/02.jpg`,
      `${RAW}/VowPay/03.jpg`,
      `${RAW}/VowPay/04.jpg`,
      `${RAW}/VowPay/05.jpg`,
      `${RAW}/VowPay/1170%20x%202532.jpg`,
    ],
  },
  {
    id: "md-3",
    slug: "barq",
    title: "Barq",
    category: "Mobile Development",
    platform: "Android",
    role: "Android Developer",
    url: "#",
    image: `${RAW}/Barq/1.jpg`,
    description:
      "A dynamic Android application with a polished, feature-rich UI delivering a seamless and engaging mobile experience for its users.",
    fullDescription:
      "Barq is a comprehensive Android application with a sleek, modern design and feature-rich functionality. Built following best Android development practices, it delivers a smooth and responsive experience across all Android devices. The app showcases strong UI/UX sensibility with attention to detail in animations, transitions, and user flows.",
    technologies: [
      "Kotlin",
      "MVVM",
      "Jetpack Components",
      "Retrofit",
      "Firebase",
      "Coroutines",
      "Material Design",
      "Navigation Component",
    ],
    features: [
      "Modern material design UI",
      "Smooth animations & transitions",
      "Optimized for all screen sizes",
      "Firebase integration",
      "Offline-first architecture",
      "Robust navigation flow",
    ],
    challenge:
      "Delivering a visually polished, high-performance app that works flawlessly across the diverse Android ecosystem with varying screen sizes and OS versions.",
    solution:
      "Adopted a robust MVVM architecture with Jetpack components and carefully crafted Material Design UI, with thorough testing across multiple devices and Android versions.",
    gallery: [
      `${RAW}/Barq/1.jpg`,
      `${RAW}/Barq/2.jpg`,
      `${RAW}/Barq/3.jpg`,
      `${RAW}/Barq/4.jpg`,
      `${RAW}/Barq/5.jpg`,
      `${RAW}/Barq/6.jpg`,
      `${RAW}/Barq/7.jpg`,
      `${RAW}/Barq/8.jpg`,
      `${RAW}/Barq/9.jpg`,
      `${RAW}/Barq/10.jpg`,
      `${RAW}/Barq/11.jpg`,
    ],
  },
  {
    id: "md-4",
    slug: "lad",
    title: "LAD",
    category: "Mobile Development",
    platform: "Android",
    role: "Android Developer",
    url: "#",
    image: `${RAW}/Lad/1.PNG`,
    description:
      "A clean, intuitive Android app with a minimal design philosophy, delivering a focused and distraction-free user experience.",
    fullDescription:
      "LAD is a carefully crafted Android application that prioritizes simplicity and user focus. With a minimal, clean interface, the app delivers its core functionality without unnecessary complexity. Every design decision was made with the end-user in mind, resulting in an app that is easy to learn and pleasant to use daily.",
    technologies: [
      "Kotlin",
      "MVVM",
      "Jetpack Components",
      "Room Database",
      "Coroutines",
      "Material Design",
      "LiveData",
      "ViewModel",
    ],
    features: [
      "Minimal, distraction-free UI",
      "Fast and responsive interactions",
      "Local data persistence with Room",
      "Clean navigation patterns",
      "Adaptive layouts",
    ],
    challenge:
      "Achieving maximum usability with a minimal interface, ensuring users can accomplish their goals quickly without a learning curve.",
    solution:
      "Focused on core user journeys and streamlined every flow to the fewest possible steps, backed by thorough usability testing and iterative design refinement.",
    gallery: [
      `${RAW}/Lad/1.PNG`,
      `${RAW}/Lad/2.PNG`,
      `${RAW}/Lad/3.PNG`,
      `${RAW}/Lad/4.PNG`,
    ],
  },
  {
    id: "md-5",
    slug: "chbib",
    title: "Chbib",
    category: "Mobile Development",
    platform: "Android",
    role: "Android Developer",
    url: "#",
    image: `${RAW}/chbib/maggsha-image.png`,
    description:
      "A feature-rich Android application delivering a unique, culturally tailored mobile experience with a visually rich interface.",
    fullDescription:
      "Chbib is an Android application designed for a culturally focused audience, featuring a visually rich and thoughtfully crafted user interface. The app combines engaging content delivery with a smooth user experience, built on a modern Android technology stack to ensure reliability and performance.",
    technologies: [
      "Kotlin",
      "MVVM",
      "Retrofit",
      "Glide",
      "Firebase",
      "Material Design",
      "Coroutines",
      "Jetpack Navigation",
    ],
    features: [
      "Culturally rich content experience",
      "Visually engaging interface",
      "Smooth content loading with Glide",
      "Firebase-powered backend",
      "Intuitive navigation",
    ],
    challenge:
      "Creating an app that resonates culturally while maintaining high performance standards and a visually appealing design.",
    solution:
      "Collaborated closely with cultural stakeholders to ensure authenticity in content and UI design, while leveraging modern Android tools like Glide and Firebase for performance.",
    gallery: [
      `${RAW}/chbib/maggsha-image.png`,
    ],
  },
];

export default MobileDevelopment;
