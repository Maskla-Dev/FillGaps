# FillGaps

FillGaps es un sistema de gestión orientado a museos cuyas actividades sean la preservación, colección, investigación,
difusión y exhibición del patrimonio histórico-cultural.

Se puede encontrar más información del proyecto en la entrada principal de la carpeta [Docs](Docs/README.md)
# Tabla de contenidos
1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Tecnologías](#tecnologías)
3. [Reglas y convenciones de desarrollo](#reglas-y-convenciones-de-desarrollo)
    1. [Convenciones en manipulación del repositorio](#convenciones-en-manipulación-del-repositorio)
    2. [Workflow del desarrollador](#workflow-del-desarrollador)
    3. [Convenciones de código](#convenciones-de-codigo)
    4. [Convenciones del frontend](#convenciones-del-frontend)
        1. [Librerías](#librerías)
    5. [Convenciones del backend](#convenciones-del-backend)
# Estructura del proyecto

El proyecto se encuentra dividido en dos carpetas principales:

- **fill-gaps**: Contiene el código fuente del servidor.
- **fill-gaps-app**: Contiene el código fuente de la aplicación web.
- **Docs**: Contiene los archivos que describen y sustentan las decisiones de implementación del proyecto.

# Tecnologías

Las tecnologías utilizadas en el proyecto son:

- **Backend**: [Django](https://www.djangoproject.com)
- **Frontend**: [ReactJS](https://react.dev), [TailwindCSS](https://tailwindcss.com), [TypeScript](https://www.typescriptlang.org)
  y [Vite](https://vitejs.dev)
- **Base de datos**: [MySQL](https://www.mysql.com/)

Las herramientas utilizadas en el proceso de desarrollo son:

- [Figma](https://www.figma.com): Elaboración de mockups y prototipos.
- [Drawio](https://app.diagrams.net): Elaboración de diagramas y esquemas.
- [Worki](https://cliente.tuneupprocess.com/web/): Gestión y administración del proyecto y equipo de trabajo.

Se recomienda utilizar [PyCharm](https://www.jetbrains.com/es-es/pycharm/) para el desarrollo del proyecto, ya que, 
el proyecto contiene scripts y configuraciones para el manejo del proyecto en este IDE. [Visual Studio Code](https://code.visualstudio.com) es una
alternativa viable, se recomienda crear configuraciones y scripts para la automatización de despliegue del servidor de
desarrollo.

# Reglas y convenciones de desarrollo

## Convenciones en manipulación del repositorio

- **Commits**: Los commits deben ser descriptivos y concisos, además de seguir la siguiente estructura:

```
(<UT ID>)<Nombre>: <Tema> | <Actividad realizada (implementacion, correccion, mejora, etc)>
    
[<Descripcion>]
    
[<Observaciones>]
```

- **Tags**: Las tags son apuntadores a commits específicos, se utilizan sólo para marcar versiones estables del
  proyecto. Se consideran los siguientes puntos para la creación de los mismos:
    - **Nombre**: El nombre es la versión del proyecto. Las versiones se deben marcar con el siguiente
      formato: `v<major.minor.patch>`, por ejemplo: `v1.0.0`. `major` es el número de versión mayor, incrementa cuando se agrega o elimina dependencias o funcionalidades principales, en general cuando se altera la estructura del software. `minor` incrementa cuando se agregan funcionalidades nuevas al software. `patch` incrementa cuando se corrigen errores o se mejora el rendimiento.
    - **Creación**: La metodología <u>_agíl_</u> que rige al proyecto y la <u>_deadline_</u>, determinan la existencia
      de por lo menos 4 sprints. Idealmente, por lo menos existirán el mismo número de <u>_tags_</u> como de <u>_sprints_</u> durante
      el desarrollo del proyecto.
- **Branches**: Cada desarrollador trabaja sobre su propia rama, existen 3 tipos de ramas, las cuales se describen a
  continuación:
    - **main**: Rama principal del proyecto, contiene los avances globales del proyecto.
    - **sprint**: Rama de desarrollo, contiene los avances del sprint actual. Se crean tantas ramas como sprints. Cuando
      termina un sprint, se crea una nueva rama `sprint` y se elimina la rama `sprint` anterior en el proceso
      de [fusión de ramas](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
    - **desarrollador**: Rama de desarrollo de cada desarrollador, contiene los avances de cada desarrollador. Se
      crearán tantas ramas como desarrolladores.
- **Pull requests**: Los pull requests se utilizan para la revisión de código y la fusión de ramas. Se recomienda que
  cada pull request tenga un título descriptivo y conciso, se sugiere la siguiente estructura para las ramas de los
  desarrolladores:

```
<Titulo>
    
[<Descripcion del trabajo realizado>]

[<UT trabajadas (features)>]

[<Observaciones>]
```

## Workflow del desarrollador

Este repositorio tiene injerencia en las áreas de producción (implementación y pruebas), por lo que, el flujo de trabajo
propuesto para la correcta gestión de los cambios en el proyecto esta determinada por la metodología _Tune-Up Process_.
Se enlistan los pasos ideales a continuación:

1. Se inicia el sprint, dentro de esas actividades está la creación de la rama sprint, al igual que las ramas de cada
   uno de los desarrolladores.

![Primer paso](Docs/Support%20images/flujo1.png)
![Segundo paso](Docs/Support%20images/flujo2.png)
![Tercer paso](Docs/Support%20images/flujo3.png)

2. El desarrollador códifica la implementación de las UT asignadas. Se recomienda que al terminar una funcionalidad se
   realice un commit.

![Cuarto paso](Docs/Support%20images/flujo4.png)

3. El desarrollador realiza commits para guardar su trabajo según
   la [convención establecida](#reglas-y-convenciones-de-desarrollo).
4. Se realiza el pull request de la rama del desarrollador a la rama sprint.

![Quinto paso](Docs/Support%20images/flujo5.png)

5. Se realizan pruebas unitarias de la UT.
6. Cuando el pull request es aprobado, se realiza la fusión de la rama del desarrollador a la rama sprint

![Sexto paso](Docs/Support%20images/flujo6.png)

7. Una vez fusionadas todas las ramas de los desarrolladores a la rama sprint, se realiza pull request a la rama main.

![Séptimo paso](Docs/Support%20images/flujo7.png)

8. Se realizan pruebas de integración y de aceptación.
9. Cuando el pull request es aprobado, se realiza la fusión de la rama sprint a la rama main.
10. Se crea la tag correspondiente a la versión del proyecto.

![Octavo paso](Docs/Support%20images/flujo8.png)
![Noveno paso](Docs/Support%20images/flujo9.png)

El flujo ideal se puede romper por diversas situaciones, a continuación se enlistan las más comunes y las acciones a
tomar:

- **No se pasan las pruebas unitarias (punto 5)**: Se rechazará el pull request, el desarrollador deberá corregir los
  errores. y realizará un nuevo pull request.
- **No se pasan las pruebas de integración o de aceptación (punto 8)**: Se rechazará el pull request, los
  desarrolladores deberán corregir los errores y realizar un nuevo pull request.
- **No hay suficiente tiempo para corregir errores (puntos 5 y 8)**: Se aceptará el pull request añadiendo comentarios y
  añadiendo issues para corregir los errores en el siguiente sprint.
- **Hotfixes**: Al ser correcciones de prioridad alta podrán pasar directamente a un pull request a la rama main desde una rama dedicada a ella, se
  recomienda que el desarrollador que realice el hotfix sea el mismo que realizó la integración de las UT que presentan fallas.
## Convenciones de codigo

- **Nomenclatura y formato**: Se utilizará la nomenclatura [camelCase](https://en.wikipedia.org/wiki/Camel_case) para
  nombrar funciones, métodos y macros. Se utilizará la
  nomenclatura [PascalCase](https://en.wikipedia.org/wiki/PascalCase) para nombrar componentes, clases, interfaces y
  estructuras. Se utilizará la nomenclatura [snake_case](https://en.wikipedia.org/wiki/Snake_case) para nombrar
  variables, constantes (en mayúsculas) y atributos. Para el formato de código, se recomienda utilizar el patrón del
  siguiente ejemplo:

```Javascript
// Ejemplo de nomenclatura y formato en javascript
const MAXIMO_NUMERO = 10;

// Objetos en javascript no son constantes
const EjemploObjeto = {
    ejemplo_atributo: 0,
    ejemploAtributoFuncion: ( parametro_nuevo ) => {
        let ejemplo_variable = parametro_nuevo + this.ejemplo_atributo;
        return ejemplo_variable;
    }
}

function ejemploFuncion( parametro_nuevo ) {
    return EjemploObjeto.ejemploAtributoFuncion( parametro_nuevo );
}

class EjemploClase {
    constructor() {
        this.ejemplo_atributo = 0;
    }

    ejemploMetodo( parametro_nuevo ) {
        let ejemplo_variable = parametro_nuevo + this.ejemplo_atributo;
        return ejemplo_variable;
    }
}

const EjemploComponente = () => {
    return (
        <>
            <div>Div no centrado</div>
        </>
    );
}

export default EjemploComponente;

const Ejemplo = () => {
    return ( <EjemploComponente/> );
}
```

- **TODOs**: Los TODOs se utilizan para marcar tareas pendientes, se recomienda utilizarlas como apoyo para recordar las
  tareas de la siguiente jornada de desarrollo. Adicionalmente, se recomienda verificar que el editor de código pueda
  realizar un seguimiento de
  los [TODOs](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight). Una vez terminada la
  tarea, se debe eliminar el TODO.

```c#
//@TODO: Terminar la implementación de la función
public void ejemploFuncionQueDeriva() { 
  int derivados = [];
  //...
}
```

- **Comentarios**: Los comentarios se utilizan para explicar el código, se recomienda utilizarlos en caso de tareas,
  abstracciones complejas y funciones/métodos que recolecten una lógica algorítmica difícil de seguir. Para evitar al
  máximo el uso de comentarios, se recomienda utilizar nombres descriptivos para las variables, constantes, atributos,
  funciones, métodos, clases, interfaces y estructuras.
    - **Algoritmos**: Especificar dentro y al inicio de la función los pasos generales del algoritmo y marcar el inicio
      de cada paso.
    - **Funciones y métodos**: Especificar el propósito de la función o método, así como los parámetros de entrada y
      salida. Se recomienda el formato de generación de documentación como JDocs o Doxygen.

```Java
//Ejemplos de uso de los comentarios en Java

//Controla el flujo de datos de entrada del Operador Catodico (ver documentacion de sistemas externos, apartado 3.2.1 Monitores de laboratorio)
class DesoperacionalizadorCatodico{
  //A partir de un buffer de bytes, se deserializa la informacion obtenida de los catodos conectados al dispostivo
  //@param buffer: Buffer de bytes obtenido del dispositivo conectado
  //@return Catodos[]: Catodos obtenidos del buffer
  protected Catodos[] deserializarBuffer(byte[] buffer){
    //1. Verifica que el buffer no este vacio
    //2. Verifica que el buffer tenga el tamaño correcto
    //3. Verifica que el buffer tenga el formato correcto (lectura de los primeros 4 bytes)
    //4. Lee la informacion separandola en los n catodos
    //5. Crea y devuelve los Catodos
    
    //#1 y #2
    if (buffer == null || buffer.length != 4) {
      throw new NullPointerException("El buffer no es valido");
    }
    //...
    unsigned int nCatodos = buffer[0];
    //...
    //#5
    Catodos[] catodos = new Catodos[nCatodos];
    //...
    return catodos;
  }
}
```

- **Idioma**: _Por definir, tal vez sea ingles..._

Tratar de seguir los diseños estructurales de cada modelo que describen componentes, clases e interfaces.
## Convenciones del frontend
La estructura del proyecto frontend se basa en el patrón de diseño [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), el cual se basa en la creación de componentes atómicos que se van agrupando en componentes más complejos. La estructura del proyecto se basa en la siguiente jerarquía:
- **Atoms**: Contiene los componentes más básicos y simples del proyecto, como botones, inputs, etc.
- **Molecules**: Contiene componentes más complejos que se componen de componentes atómicos, como formularios, etc.
- **Organisms**: Contiene componentes que se componen de componentes moleculares y atómicos, como la barra de navegación, etc.
- **Pages**: Contiene componentes que se componen de componentes orgánicos, moleculares y atómicos, como la página de inicio, etc.
- **Templates**: Contiene componentes que se componen de componentes de cualquier tipo, como la plantilla de la página, etc.

Muchas de las abstracciones pueden tener dependencias con otras abstracciones que no encajan con la jerarquía planteada, por ejemplo, un componente orgánico puede tener dependencia con agentes (clases u objetos) dedicados a la abstracción de cierta lógica. Inclusive la generalización de funcionalidades mediante hooks puede crear estas situaciones. Para ello se recomienda alojar estas abstracciones en la carpeta **utils**.
La carpeta **assets** contiene los recursos estáticos utilizados en el proyecto, como imágenes, fuentes, etc. Serán anexados a la carpeta **public** al momento de la compilación.
### Librerías
Las siguientes librerias adicionales son utilizadas en el proyecto:
- **React Router**: Librería para el manejo de rutas en React.
- **Redux**: Librería para el manejo de estado de la aplicación.

## Convenciones del backend
