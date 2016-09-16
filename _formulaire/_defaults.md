---
event_woopra: formulaire
panneau_introduction:
  fond_image_path:
  fond_color:
  texte_html:
panneau_question:
  fond_image_path:
  fond_color:
  texte_html:
  champs:
    - type: champ_libre_court
      nom_machine: exemple
      reponses:
        - valeur:
      options:
        propriete_visiteur: false
        label: Exemple de champ libre
        placeholder:
        requis: false
        message_erreur:
        controle:
        fond_image_path:
        fond_color:
panneau_informations_personnelles:
  fond_image_path:
  fond_color:
  texte_html:
  champs:
    - type: champ_libre_court
      nom_machine: firstname
      reponses:
        - valeur:
      options:
        propriete_visiteur: false
        label: Prénom
        placeholder:
        requis: false
        message_erreur:
        controle:
        fond_image_path:
        fond_color:
options:
  bouton_de_soumission: "Envoyer"
  page_de_remerciement_path: /index.html
  largeur_champ: "100%"
  champs_caches:
    - nom:
      valeur:
      propriete_visiteur: false
  meta:
    title:
    description:
_comments:
  nom: Obligatoire et unique. Description courte du champ
  texte: Ce champ peut etre vide
  placeholder: 'Seulement pour les champs de type "champ libre"'
  controle: 'Seulement pour les champs de type "champ libre"'
  reponses: 'Seulement pour les champs de type "choix"'
  page_de_remerciement_path: "URL de la page lorsque l'utilisateur valide le formulaire"
  propriete_visiteur: Cochez cette case si vous souhaitez que ce champ remonte dans les propriétés du visiteur sur Woopra
  event_woopra: "Nom de l'evenement sur Woopra qui stockera les répondants <a href=\'http://google.com\' target=\'_blank\'>blabla</a>"
  fond_image_path: "Image de fond du champ"
  fond_image: "Couleur du fond (s'applique si fond_image_path est vide)"
  largeur_champ: "Définit la taille des champs"
---
{% include form.html %}
