const data = JSON.parse(
  localStorage.getItem("carbonData")
);

const transport =
data?.transport ;

const food =
data.food ;

const numerique =
data.numerique ;

const total =
transport +
food +
numerique;

document.getElementById("total")
.textContent =
total.toFixed(2)
+ " kgCO₂e";

new Chart(

  document.getElementById("chart"),

  {

    type:"bar",

    data:{

      labels:[

        "Transport",
        "Alimentation",
        "Numérique"

      ],

      datasets:[{

        label:"kgCO₂e",

        data:[

          transport,
          food,
          numerique

        ],

        backgroundColor:[

          "#27AE60",
          "#f0fb5f",
          "#3498DB"

        ]

      }]

    },

    options:{  }

  }

);