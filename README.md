# MIASHS-M2-TP3-Projet --> Mon readMe plus bas

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Mon Rapport

## Installation et lancement du projet 

### Mode développeur

- Run `git clone https://github.com/silvestv/MIASHSM2-PWA-Projet-Silvestre-Victor.git`.
- Se placer dans le répertoire fraîchement créé.
- Run `npm install --save` afin d'installer et de déclarer toutes les dépendances du projet
- Run `ng serve --open` 
- Naviguer

### En mode Build
- Run `npm install -g --save http-server`
- Run `ng build --prod`
- Run `http-server dist`
- Naviguer sur le serveur local http://127.0.0.1:8080

## Liste des dépendances (en cas de soucis) 
- bootstrap
- bootswatch
- font-awesome
- ReactiveForm
- ShowHidePassword
- Attention style changé en SCSS

## Liste des Fonctionnalités

- To do liste complète (ajout d'une tâches, todo checked, suppression items)
- suppression par le cochage de l'ensemble des items
- css / apparition des filtre unique si item
- nombre de tâches restantes 
- local storage pour todolist & utilisateur
- undo/redo
- tout supprimer 
- Routing vers page connexion / inscription
- ajout nouvel utilisateur
- Angular reactive form & validateur
- Réelle connexion avec recherche des utilisateurs présent dans les datas du service 
- Authentification Guard pour protéger les routes à l'utilisateur non connecté 
- Méthode asynchrone pour afficher à l'utilisateur le nombre de seconde qu'il est connecté (marche mal se met à jour uniquement à chaque action)

## Détails sur les fonctionnalités

### suppression par le cochage de l'ensemble des items

- vue en TP

### Apparition des commandes, selon état de la liste 

Utilisation de la directive structurelle angular *ngIf associé à une méthode renvoyant un boolean neddToAppear() permettant de connâitre si un item est présent dans la todo, et si il y a au moins 1 item de coché.

### Nombre de tâches restantes 

DataBinding (interpolation) sur le nombreItemRestant initialisé par une fonction appliquant un filtre sur les items done

### local storage TodoList & Utilisateur

Le local storage permet de sauvegarder les données d'une session, pour effectuer un local storage il est important de créer 2 fonctions load() & save(). save() sera appelé à chaque fois que l'utilisateur effectue une action afin de sauvegarder l'état courant d'une liste. Ce qui nous sera utile pour le undo/redo. Le load() permet d'initialiser la liste (quand le component et créé et refait appel au service associé) et rechargera toute les anciennes données sauvegardées dans la session local storage du navigateur (coté client).
- Dificulté : il est important de comprendre l'importance de sérialiser l'état des items en JSON.stringtify avant les reconstruire pour traitement grâce à JSON.parse

### Undo/Redo

Cette fonctionnalité découle de la précédente : 
- nous créons 2 tableaux undo / redo 
- de la même manière que pour save() nous enregistrons à chaque action l'état courant de chaque item dans ce tableau grâce à un push.
- Grâce aux méthodes undoAction() & redoAction() déclencher lors des clicks sur les boutons adéquants, il est alors facile de naviguer entre les différents états du tableau avant et après chaque modification.
- Difficulté : il faut penser à mettre a jour le subject afin qu'il envoie les bonnes données grâce à next(), de plus il faut penser à pop() les dernier état courant des tableaux lorsque qu'un redo/undo est effectué.

### Tout supprimer 

On affecte simplement à la valeur items du subject (et on le fait émettre) un tableau vide. On appelera cette méthode de service sur le component.

### Routing page inscription/connexion

- Mise en place de redirection mettre la route par défaut (redirectTo)
- mise en place d'extension à l'url :id pour 1 liste par utilisateur (malheuresement non exploité)
- mise en place de canActivate sur le routing pour appliquer le guard AuthGuard
- Navigation dans le app.routing vers les 3 nouveaux components --> listUsers (les users créés) / new-user (pour l'inscription) / authentification (pour la connexion)

### ajout utilisateur & Reactive form

Grâce à au Module ReactiveFormsModule présent dans angular, nous pouvons préparer nos propre validateur de champs de manière dynamique, et ainsi avoir un grand contrôle sur la soumission de se dernier.
- Les validateurs sont appliquées sur le nom, prénoms. 
- validateur spécial pour email (Validators.email)
- validateur de longueur mnimal pour les passwords
- options appliquées sur les validateurs devant répondre à la méthode MustMatch(password, confirmPassword). Cette méthode vérifie que les 2 mot de passes rentrés par l'utilisateur sont bien les mêmes grace à matchingControl.

Le .controls appliquable sur le userForm permet de savoir à tout moment si le formulaire est valide, on peut alors s'en servir dans la vue afin d'afficher des feedbacks immédiats qui avertiront l'utilisateur que les champs entrés sont incorrects, c'est message sont personalisées pour l'adresse mail (vide ou incorrect) et pour les mot de passe.

Le package NPM showHidePassword est très sympa, il permet de montrer ou non le mdp selon que souhaite l'utilisateur.

Si un utilisateur est bel et bien créé il est sauvegardé dans le service User qui utilise le localstorage. Cela nous servira pour la connection.

La liste des utilisateurs est accessible depuis todo pour n'importe quel user connecté. Ce n'est pas réaliste mais ceci permet de bien comprendre comment tout cela se passe ainsi que de vérifier le bon fonctionnement des utilisateurs.

Si l'utilisateur est crée avec succès une alert est lancée indiquant les différents champs de l'utilisateur (User est un Type présent dans le dossier models). Puis l'utilisateur est redirigé vers la page de connection grâce à la méthode navigate utilisable si on injecte dans le constructeur d'un component un Router.

### Connexion

La connection implique un reactive Form également, elle vient tout simplement vérifier grâce à la méthode containUser du service associé, que un utilisateur existe en fonction de son mot de passe et de son email. Si l'utilisateur s'est trompé ou ne possède pas de compte alors une alert l'avertira qu'il ne peut pas se connecter. 
Si l'utilisateur parvient à se connecter, on simule (dans Authentification service) une recherche en base de donnée (grâce à un setTimeOut avant de mettre le status de l'utilisateur à connecté) avec une petite attente de 1seconde. Puis, l'utilisateur connecté, pour naviguer sur la todoList.
Difficulté : le message Bonjour name, lastname, et les différent set et get pour binder les données de l'utilisateur en fonction de son email sur la vue.

### L'authentification Guard

Ce route Guard permet de protéger les routes tels que todo ou encore listUsers pour tout individu non connecté grâce à la fonction prédéfinie CanActivate(), qu'il faudra également indiquer dans le module de routing d'angular.
Pour savoir ou le Guard s'effectue se dernier utilise un Snapshot de la route.

### Méthode asynchrone simple

Lorsqu'un utilisateur est connecté on lui décompte grâce à une Promise depuis combiende temps se dernier navigue.
Problème : le compteur se met à jour uniquement lorsqu'une action est effectué. Il doit y avoir un conflit de souscription. 








