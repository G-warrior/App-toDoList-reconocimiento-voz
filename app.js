const app = new Vue({
  
  el: '#app',
  data: {
    titulo: 'TodoList',
    tareas: [],
    nuevaTarea: '',
    user:'',
    modo:null,
    completeTask:null

  },
  methods:{
    agregarTarea: function(){
        if(this.nuevaTarea === ''){
        //alerta en caso de dejar el campo vacio
        Swal.fire({
          title: 'Error!',
          text: 'No puedes dejar vacio el campo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        //alerta en caso de sobrepasar la cantidad de 10 de tareas
      }else if(this.tareas.length == 10){
          Swal.fire({
            title: 'Error!',
            text: 'No seas tan ambisioso(a) solo se permite un maximo de 10 tareas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          this.nuevaTarea = ''
          //Si las condiciones anteriores no se llevan a cabo entonces
          //se incluira la nueva tarea en en el toque de la lista con un
          //estado de false
        }else{
          this.tareas.push({
            nombre: this.nuevaTarea,
            estado: false
          });
        }
          
      localStorage.setItem('todolist-vue', JSON.stringify(this.tareas));
      this.nuevaTarea = '';
      this.agregarSpinner()
    },
    cambiarEstado(index,item){
      this.tareas[index].estado = true;
      localStorage.setItem('todolist-vue', JSON.stringify(this.tareas));
      localStorage.setItem('tareas completadas', JSON.stringify(this.tareas[index].estado))
    },
    eliminar(index){
      this.tareas.splice(index, 1);
      localStorage.removeItem('todolist-vue', JSON.stringify(this.tareas));
      localStorage.removeItem('tareas completadas',JSON.stringify(this.tareas));
    },
    agregarSpinner(){
       const spinner = 
      `
      <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>

       `;
       const container = document.querySelector('.cajaBtn');
       container.appendChild(spinner)
       console.log(container);
    },
    agregarVoz(e){
      let index = e.resultIndex;
      let contenido = e.results[index][0].transcript
      this.nuevaTarea = contenido;
    },
    agregarAPI(){
        if(!(webkitSpeechRecognition)in window){
            console.log('usted no puede usar la api')
        }else{
            console.log('usted puede usar la api')
            rec = new webkitSpeechRecognition();
            rec.lan= 'es-ES';
            rec.continuous = false;
            rec.interimResults = true;
            rec.onresult = (e)=>{this.agregarVoz(e)}
            rec.start();
        }
     
    },
    switchMode(e){
      const btnSwitch = document.getElementById('cambioTema');
     if(e.isTrusted){
      // prueba console.log('esta negro')
      document.body.classList.toggle('bDark')
      let temaAlmacenamiento = localStorage.setItem('tema','bDark')
     }
    },
    

 
  },
  created: function(){
    let datosDB = JSON.parse(localStorage.getItem('todolist-vue'));
    if(datosDB === null){
      this.tareas = [];
    }else{
      this.tareas = datosDB;
    }
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const tareasAlmacenamiento = localStorage.getItem('todolist-vue');
    
    if(/*this.user == ''*/nombreUsuario == null){
      Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes escribir tu nombre!'
          }else{
            Swal.fire(`Bienvenido ${value}`)
            this.user = value;
            console.log('no existe');
            let logoUsuario = document.querySelector('.Usuario');
            logoUsuario.textContent = this.user;}
            localStorage.setItem('nombreUsuario',this.user)
        }
      })
    }else{
      let logoUsuario = document.querySelector('.Usuario');
      this.user = localStorage.getItem('nombreUsuario');
      logoUsuario.textContent = this.user;
    }

    

 

 
   
  }


});