import { Testimonial, RegionCoverage } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Jean-Pierre Tremblay',
    rating: 5,
    date: '2026-06-15',
    comment: 'After my knee replacement surgery, I was so worried about traveling to a clinic. Rachel came directly to my home in Longueuil. Her professionalism, kindness, and customized exercises helped me walk pain-free in just 6 weeks. Incredible service!',
    conditionTreated: 'Knee Replacement Recovery'
  },
  {
    id: 't2',
    name: 'Sarah Goldstein',
    rating: 5,
    date: '2026-05-20',
    comment: 'Rachel is an absolute lifesaver. My 82-year-old mother was losing her balance and feared falling. Rachel worked with her in her living room, practicing safe transfers and building leg strength. Her confidence and independence have skyrocketed!',
    conditionTreated: 'Fall Prevention & Balance'
  },
  {
    id: 't3',
    name: 'Marc-André Moreau',
    rating: 5,
    date: '2026-04-12',
    comment: 'I injured my lower back lifting heavy boxes. Rachel set up her mobile treatment table right in my home, did deep tissue mobilization, and taught me proper lifting techniques. Being treated at home meant I did not have to drive while in pain.',
    conditionTreated: 'Acute Lower Back Pain'
  },
  {
    id: 't4',
    name: 'Eleanor Vance',
    rating: 5,
    date: '2026-03-05',
    comment: 'Highly recommend Rachel! Having home visits for my post-fracture rehab made scheduling so much easier with my busy remote work schedule. She is incredibly knowledgeable and friendly.',
    conditionTreated: 'Post-Fracture Rehabilitation'
  }
];

export const REGIONS: RegionCoverage[] = [
  { postalPrefix: 'H1', neighborhood: 'Anjou, Montreal-Nord, Saint-Leonard', covered: true },
  { postalPrefix: 'H2', neighborhood: 'Plateau Mont-Royal, Outremont, Villeray', covered: true },
  { postalPrefix: 'H3', neighborhood: 'Downtown Montreal, Westmount, Notre-Dame-de-Grace', covered: true },
  { postalPrefix: 'H4', neighborhood: 'Saint-Laurent, Ahuntsic, Cartierville', covered: true },
  { postalPrefix: 'H8', neighborhood: 'Lachine, Lasalle, Verdun', covered: true },
  { postalPrefix: 'H9', neighborhood: 'Pointe-Claire, Kirkland, Dollard-des-Ormeaux', covered: true },
  { postalPrefix: 'J4', neighborhood: 'Longueuil, Saint-Lambert, Brossard (South Shore)', covered: true },
  { postalPrefix: 'J3', neighborhood: 'Boucherville, Saint-Bruno, Saint-Hubert (South Shore)', covered: true }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      about: 'About',
      expertise: 'Expertise',
      benefits: 'Benefits',
      booking: 'Book Appointment',
      testimonials: 'Testimonials',
      contact: 'Contact Me',
      langToggle: 'Français',
      license: 'OPPQ License #12345'
    },
    hero: {
      tagline: "Feel better. Move better.",
      subtagline: "In the comfort of your home!",
      subtitle: "Professional, personalized, and convenient in-home physiotherapy. Serving the entire Island of Montreal & the South Shore.",
      ctaBook: "Schedule Phone Consultation",
      ctaLearn: "Explore Home Benefits",
      promo: "PROMOTION: 10% OFF YOUR FIRST SESSION!",
      freeConsult: "Schedule a FREE 15-minute phone consultation today!"
    },
    about: {
      title: "About Me",
      experience: "12+ Years of Experience",
      p1: "As a certified Physiotherapist with 12+ years of experience in the Montreal area, I specialize in treating a wide range of orthopedic, neurological, and geriatric conditions directly inside my patients' homes.",
      p2: "My mobile clinic brings personalized care directly to you, eliminating the stress and physical pain of traveling. I offer effective, evidence-based treatments including therapeutic massage, joint mobilization, neuromuscular re-education, and tailored exercise rehabilitation.",
      p3: "Whether you're recovering from joint replacement surgery, managing chronic musculoskeletal pain, or seeking to improve your balance and prevent falls, my goal is to help you regain your independence and get back to feeling your absolute best.",
      credentialTitle: "Professional Credentials",
      credentials: [
        "Member of the Ordre professionnel de la physiothérapie du Québec (OPPQ)",
        "B.Sc. & M.Sc. in Physical Therapy (McGill University)",
        "Specialized training in Geriatric Rehabilitation & Fall Prevention",
        "Advanced Manual Therapy & Post-Surgical Rehab certification"
      ]
    },
    benefits: {
      title: "Benefits of Home Physio",
      subtitle: "Why choose mobile treatment over a traditional outpatient clinic?",
      items: [
        {
          title: "Convenience & Comfort",
          description: "Skip the stressful traffic, Montreal construction, and winter weather. Receive high-quality, professional care in the secure environment of your own home."
        },
        {
          title: "Faster Recovery in a Familiar Environment",
          description: "Rehab tasks are directly integrated into your daily environment (stairs, kitchen counters, furniture), leading to faster adoption and muscle memory."
        },
        {
          title: "Improved Mobility & Flexibility",
          description: "We focus on real-world functional improvements that help you navigate your actual living space safely and independently."
        },
        {
          title: "Zero Travel Pain or Strain",
          description: "Traveling while in acute pain or following major surgery can set back your recovery. My service completely removes that burden."
        },
        {
          title: "Reduced Risk of Exposure",
          description: "Avoid crowded waiting rooms and exposure to seasonal illnesses. Stay safe, clean, and isolated in your own sanitized home environment."
        },
        {
          title: "Boosts Independence & Self-Confidence",
          description: "By learning exercises in your home, you gain immediate, autonomous confidence to perform them daily without a clinic supervisor."
        },
        {
          title: "Ultimate Scheduling Flexibility",
          description: "No clinic-enforced slots. We schedule around your specific lifestyle, family visits, or remote work hours."
        }
      ]
    },
    expertise: {
      title: "What I Treat",
      subtitle: "Expert therapeutic care for a wide range of temporary and chronic conditions.",
      items: [
        {
          title: "Joint Replacement Surgery",
          description: "Complete rehabilitation programs for total knee, total hip, or shoulder replacements to restore range of motion and strength."
        },
        {
          title: "Post-Op Recovery",
          description: "Personalized care following orthopedic surgeries, fractures, ligament repairs, or arthroscopies to reduce swelling and pain."
        },
        {
          title: "Musculoskeletal Pain",
          description: "Targeted treatments for acute or chronic back, neck, shoulder, and knee pain, including sciatica and osteoarthritis."
        },
        {
          title: "Reduced Mobility & Balance",
          description: "Structured conditioning programs for adults experiencing reduced function, poor posture, or unsteady gait."
        },
        {
          title: "Difficulty Mobilizing at Home",
          description: "Functional home assessments and specific drills to help you safely move around your home, stairs, and community."
        },
        {
          title: "Fall Prevention",
          description: "Risk assessments, balance challenges, and strength work specifically designed to prevent painful, high-consequence slips."
        },
        {
          title: "General Deconditioning",
          description: "Gentle, progressive whole-body re-conditioning following a hospital stay, severe illness, or long period of inactivity."
        },
        {
          title: "Neurological Disorders",
          description: "Maintenance and recovery therapy for patients living with Stroke, Parkinson’s Disease, Multiple Sclerosis, or neuropathy."
        }
      ]
    },
    booking: {
      title: "Book Your Appointment",
      subtitle: "Select a date, fill out your details, and secure your session.",
      step1: "1. Select Session Type",
      step2: "2. Choose Date & Time",
      step3: "3. Patient Details",
      types: {
        assessment: {
          title: "Initial In-Home Assessment & Treatment",
          duration: "75 Mins",
          price: "$130",
          desc: "Comprehensive diagnostic check, functional movement screen, and initial manual treatment + customized home exercises plan."
        },
        followup: {
          title: "Follow-Up In-Home Therapy Session",
          duration: "60 Mins",
          price: "$110",
          desc: "Targeted manual therapy (massage, mobilization), reassessment, progressive exercise coaching, and recovery tracking."
        },
        consult: {
          title: "FREE 15-Minute Phone Consultation",
          duration: "15 Mins",
          price: "Free",
          desc: "Brief phone call to discuss your clinical needs, see if home physio is right for you, and answer any general questions."
        }
      },
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        address: "Home Address (Montreal Area)",
        postalCode: "Postal Code (e.g. H2W 1Y4)",
        notes: "Clinical Notes / Reason for booking",
        notesPlaceholder: "Please describe your pain, surgery type, or treatment history...",
        submit: "Confirm Booking Requests",
        loading: "Processing request...",
        successTitle: "Booking Request Received!",
        successDesc: "Thank you! I will review your request and get in touch with you at {contact} within 2 hours to finalize the schedule and discuss intake forms.",
        successPromo: "Applied: 10% promotional discount has been noted for your first in-home session!",
        validationError: "Please fill out all required fields with valid details.",
        postalWarning: "Note: We only serve Montreal Island and the South Shore (Postal codes starting with H or J4/J3)."
      },
      slots: {
        morning: "Morning (9:00 AM - 12:00 PM)",
        midday: "Midday (12:00 PM - 3:00 PM)",
        afternoon: "Afternoon (3:00 PM - 6:00 PM)"
      },
      manage: {
        title: "Your Scheduled Bookings",
        empty: "No appointments scheduled in this session.",
        cancel: "Cancel",
        cancelled: "Cancelled",
        status: "Status",
        confirmed: "Confirmed (Pending Review)"
      }
    },
    testimonials: {
      title: "Patient Testimonials",
      subtitle: "Read success stories from patients who recovered in their own living rooms.",
      addReview: "Share Your Recovery Story",
      form: {
        name: "Your Name",
        rating: "Rating",
        condition: "Condition Treated",
        conditionPlaceholder: "e.g. Total Knee Replacement",
        comment: "Your Review",
        commentPlaceholder: "Describe your recovery journey, how Rachel helped, and what you loved about home physio...",
        submit: "Post Testimonial",
        success: "Thank you! Your testimonial has been posted successfully below."
      }
    },
    coverage: {
      title: "Service Area & Postal Code Check",
      subtitle: "Serving the Island of Montreal and the South Shore.",
      placeholder: "Enter postal code (e.g., H2X)",
      checkBtn: "Check Coverage",
      success: "Great news! {code} is within our active in-home service area.",
      fail: "We do not regularly cover {code}, but please contact me directly to see if special arrangements can be made.",
      invalid: "Please enter a valid Canadian postal code (e.g., H2X or J4Y).",
      listTitle: "Major Covered Neighborhoods"
    },
    footer: {
      contactTitle: "Contact Information",
      hoursTitle: "Working Hours",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
      rights: "© 2026 Rachel Dara Temper, pht. All rights reserved.",
      disclaimer: "Rachel Dara Temper is a licensed Physiotherapist (pht) registered with the OPPQ. In-home treatments are fully eligible for private insurance reimbursement. Receipts are issued automatically upon payment.",
      madeWith: "Serving Montreal, Longueuil, Brossard, Saint-Lambert, and surrounding areas."
    }
  },
  fr: {
    nav: {
      about: 'À propos',
      expertise: 'Expertise',
      benefits: 'Avantages',
      booking: 'Prendre rendez-vous',
      testimonials: 'Témoignages',
      contact: 'Me contacter',
      langToggle: 'English',
      license: 'Licence OPPQ #12345'
    },
    hero: {
      tagline: "Sentez-vous mieux. Bougez mieux.",
      subtagline: "Dans le confort de votre foyer !",
      subtitle: "Physiothérapie à domicile professionnelle, personnalisée et pratique. Desservant l'île de Montréal et la Rive-Sud.",
      ctaBook: "Planifier un appel gratuit",
      ctaLearn: "Avantages à domicile",
      promo: "PROMOTION : 10% DE RABAIS SUR VOTRE PREMIÈRE SÉANCE !",
      freeConsult: "Planifiez une consultation téléphonique de 15 minutes GRATUITE aujourd'hui !"
    },
    about: {
      title: "À propos de moi",
      experience: "Plus de 12 ans d'expérience",
      p1: "En tant que physiothérapeute agréée comptant plus de 12 ans d'expérience dans la région de Montréal, je me spécialise dans le traitement d'une grande variété de conditions orthopédiques, neurologiques et gériatriques directement chez mes patients.",
      p2: "Ma clinique mobile apporte des soins personnalisés directement à vous, éliminant le stress et la douleur physique liés aux déplacements. J'offre des traitements efficaces et fondés sur des données probantes, notamment le massage thérapeutique, la mobilisation articulaire, la rééducation neuromusculaire et la réadaptation par l'exercice sur mesure.",
      p3: "Que vous vous remettiez d'une chirurgie de remplacement articulaire, que vous gériez des douleurs musculosquelettiques chroniques ou que vous cherchiez à améliorer votre équilibre et à prévenir les chutes, mon objectif est de vous aider à retrouver votre autonomie et à vous redonner votre pleine forme.",
      credentialTitle: "Titres professionnels",
      credentials: [
        "Membre de l'Ordre professionnel de la physiothérapie du Québec (OPPQ)",
        "Bacc. et Maîtrise en Physiothérapie (Université McGill)",
        "Formation spécialisée en réadaptation gériatrique et prévention des chutes",
        "Certification avancée en thérapie manuelle et réadaptation post-chirurgicale"
      ]
    },
    benefits: {
      title: "Avantages de la physio à domicile",
      subtitle: "Pourquoi choisir le traitement mobile plutôt qu'une clinique externe traditionnelle ?",
      items: [
        {
          title: "Commodité et confort",
          description: "Évitez le stress de la circulation, les cônes orange de Montréal et le froid de l'hiver. Recevez des soins professionnels de qualité supérieure dans la sécurité de votre foyer."
        },
        {
          title: "Récupération plus rapide dans un environnement familier",
          description: "Les exercices de réadaptation sont directement intégrés dans votre environnement quotidien (escaliers, comptoirs, meubles), facilitant l'adoption et la mémoire musculaire."
        },
        {
          title: "Amélioration de la mobilité et de la flexibilité",
          description: "Nous nous concentrons sur des améliorations fonctionnelles réelles qui vous aident à vous déplacer en toute sécurité et de façon autonome dans votre espace de vie."
        },
        {
          title: "Aucune douleur liée aux déplacements",
          description: "Se déplacer en période de douleur aiguë ou après une chirurgie majeure peut nuire à votre récupération. Mon service élimine complètement ce fardeau."
        },
        {
          title: "Risque réduit d'exposition aux contagions",
          description: "Évitez les salles d'attente bondées et l'exposition aux virus saisonniers. Restez en sécurité, au propre et isolé dans votre domicile désinfecté."
        },
        {
          title: "Renforce l'autonomie et la confiance en soi",
          description: "En apprenant les mouvements chez vous, vous gagnez une confiance immédiate pour les exécuter quotidiennement sans supervision constante."
        },
        {
          title: "Flexibilité d'horaire ultime",
          description: "Pas de créneaux rigides imposés par la clinique. Nous planifions en fonction de votre style de vie, de vos visites familiales ou de vos heures de télétravail."
        }
      ]
    },
    expertise: {
      title: "Ce que je traite",
      subtitle: "Des soins thérapeutiques experts pour un large éventail de conditions temporaires et chroniques.",
      items: [
        {
          title: "Chirurgie de remplacement articulaire",
          description: "Programmes complets de rééducation pour prothèses totales du genou, de la hanche ou de l'épaule afin de restaurer la mobilité et la force."
        },
        {
          title: "Récupération post-opératoire",
          description: "Soins personnalisés après des chirurgies orthopédiques, fractures, réparations ligamentaires ou arthroscopies pour réduire l'enflure et la douleur."
        },
        {
          title: "Douleurs musculosquelettiques",
          description: "Traitements ciblés pour les douleurs aiguës ou chroniques du dos, du cou, des épaules et des genoux, y compris la sciatique et l'arthrose."
        },
        {
          title: "Mobilité et équilibre réduits",
          description: "Programmes de reconditionnement structurés pour les adultes souffrant d'une baisse fonctionnelle, d'une mauvaise posture ou d'une démarche instable."
        },
        {
          title: "Difficulté à se déplacer à la maison",
          description: "Évaluations ergonomiques et exercices spécifiques pour vous aider à vous déplacer en toute sécurité dans la maison, les escaliers et le quartier."
        },
        {
          title: "Prévention des chutes",
          description: "Évaluation des risques, défis d'équilibre et renforcement conçus spécifiquement pour prévenir les glissades douloureuses et lourdes de conséquences."
        },
        {
          title: "Déconditionnement généralisé",
          description: "Reconditionnement doux et progressif de l'ensemble du corps suite à un séjour à l'hôpital, une maladie grave ou une longue période d'inactivité."
        },
        {
          title: "Troubles neurologiques",
          description: "Thérapie de maintien et de récupération pour les patients vivant avec les suites d'un AVC, la maladie de Parkinson, la sclérose en plaques ou une neuropathie."
        }
      ]
    },
    booking: {
      title: "Prendre votre rendez-vous",
      subtitle: "Sélectionnez un service, choisissez une date et remplissez vos informations.",
      step1: "1. Sélectionner le type de séance",
      step2: "2. Choisir la date et l'heure",
      step3: "3. Informations du patient",
      types: {
        assessment: {
          title: "Évaluation initiale à domicile et traitement",
          duration: "75 Min",
          price: "130 $",
          desc: "Bilan diagnostique complet, analyse des mouvements fonctionnels, premier traitement manuel et plan d'exercices personnalisés."
        },
        followup: {
          title: "Séance de suivi en physiothérapie à domicile",
          duration: "60 Min",
          price: "110 $",
          desc: "Thérapie manuelle ciblée (massage, mobilisations), réévaluation, enseignement d'exercices progressifs et suivi de la récupération."
        },
        consult: {
          title: "Consultation téléphonique GRATUITE (15 min)",
          duration: "15 Min",
          price: "Gratuit",
          desc: "Bref appel pour discuter de vos besoins cliniques, évaluer si la physio à domicile vous convient et répondre à vos questions."
        }
      },
      form: {
        name: "Nom complet",
        email: "Adresse courriel",
        phone: "Numéro de téléphone",
        address: "Adresse résidentielle (Région de Montréal)",
        postalCode: "Code postal (ex. H2W 1Y4)",
        notes: "Notes cliniques / Motif de consultation",
        notesPlaceholder: "Veuillez décrire vos douleurs, type de chirurgie ou antécédents médicaux...",
        submit: "Confirmer la demande de rendez-vous",
        loading: "Traitement en cours...",
        successTitle: "Demande reçue avec succès !",
        successDesc: "Merci ! Je vais examiner votre demande et vous contacter au {contact} dans les 2 heures pour finaliser l'heure et discuter des formulaires d'admission.",
        successPromo: "Appliqué : Le rabais promotionnel de 10% a été noté pour votre première séance à domicile !",
        validationError: "Veuillez remplir tous les champs obligatoires avec des informations valides.",
        postalWarning: "Note : Nous desservons uniquement l'île de Montréal et la Rive-Sud (Codes postaux commençant par H, J4 ou J3)."
      },
      slots: {
        morning: "Matin (9h00 - 12h00)",
        midday: "Midi (12h00 - 15h00)",
        afternoon: "Après-midi (15h00 - 18h00)"
      },
      manage: {
        title: "Vos rendez-vous programmés",
        empty: "Aucun rendez-vous planifié pour cette session.",
        cancel: "Annuler",
        cancelled: "Annulé",
        status: "Statut",
        confirmed: "Confirmé (En attente de révision)"
      }
    },
    testimonials: {
      title: "Témoignages de patients",
      subtitle: "Découvrez les histoires de réussite de patients qui ont récupéré dans leur propre salon.",
      addReview: "Partagez votre histoire de guérison",
      form: {
        name: "Votre nom",
        rating: "Évaluation",
        condition: "Condition traitée",
        conditionPlaceholder: "ex. Prothèse totale du genou",
        comment: "Votre commentaire",
        commentPlaceholder: "Décrivez votre parcours de récupération, comment Rachel vous a aidé et ce que vous avez aimé de la physio à domicile...",
        submit: "Publier le témoignage",
        success: "Merci ! Votre témoignage a été publié avec succès ci-dessous."
      }
    },
    coverage: {
      title: "Zone de service et code postal",
      subtitle: "Desservant l'île de Montréal et la Rive-Sud.",
      placeholder: "Entrez le code postal (ex., H2X)",
      checkBtn: "Vérifier la couverture",
      success: "Excellente nouvelle ! {code} est situé dans notre zone de service active à domicile.",
      fail: "Nous ne desservons pas régulièrement le code {code}, mais veuillez me contacter directement pour voir si des arrangements spéciaux sont possibles.",
      invalid: "Veuillez entrer un code postal canadien valide (ex., H2X ou J4Y).",
      listTitle: "Principaux quartiers desservis"
    },
    footer: {
      contactTitle: "Coordonnées",
      hoursTitle: "Heures d'ouverture",
      hours: "Lundi - Vendredi : 8h00 - 18h00\nSamedi : 9h00 - 14h00\nDimanche : Fermé",
      rights: "© 2026 Rachel Dara Temper, pht. Tous droits réservés.",
      disclaimer: "Rachel Dara Temper est physiothérapeute agréée (pht) membre de l'OPPQ. Les traitements à domicile sont admissibles aux remboursements d'assurances privées. Des reçus officiels sont émis pour chaque séance.",
      madeWith: "Desservant Montréal, Longueuil, Brossard, Saint-Lambert, et les environs."
    }
  }
};
