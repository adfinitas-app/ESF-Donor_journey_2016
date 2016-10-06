---
title: Petition
evenement_woopra: Formulaire de test
panneau_introduction:
  fond_image_path:
  texte_html:
panneau_informations_personnelles:
  texte_html:
  champs:
    - type: champ_libre_court
      nom_machine: phone
      reponses:
        - valeur:
      options:
        propriete_visiteur: true
        label: Veuillez entrer votre numéro de téléphone (Obligatoire)
        placeholder: 'Téléphone *'
        requis: true
        message_erreur: Numéro de téléphone invalide
        controle: telephone
        fond_image_path: 'http://www.unesourisetmoi.info/data/medias/photos/134/changer-fond-ecran-windows_01.jpg'
        fond_color:
options:
  champs_caches_liste:
    - nom: cid
      valeur: 1
      propriete_visiteur: true
bouton_de_soumission: "Signer l'a pétiton"
page_de_remerciement_path: /index.html
_comments:
  nom: Obligatoire et unique. Description courte du champ
  texte: Ce champ peut etre vide
  placeholder: 'Seulement pour les champs de type "champ libre"'
  controle: 'Seulement pour les champs de type "champ libre"'
  reponses: 'Seulement pour les champs de type "choix"'
  page_de_remerciement_path: "URL de la page lorsque l'utilisateur valide le formulaire"
  propriete_visiteur: Cochez cette case si vous souhaitez que ce champ remonte dans les propriétés du visiteur sur Woopra
  evenement_woopra: "Nom de l'evenement sur Woopra qui stockera les répondants"
  fond_image_path: Image de fond du champ
---

