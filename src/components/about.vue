<template>
    <div>
        <div class="scroll-to-top">
                <button @click="scrollToTop"> Subir </button>
         </div>
            <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center">

            <div class="container d-flex flex-column align-items-center justify-content-center" data-aos="fade-up">
            
            <img src="../images/hero-img.png" class="img-fluid hero-img" height="250px" alt="" data-aos="zoom-in" data-aos-delay="150">
            </div>

        </section><!-- End Hero -->

            <!-- ======= Features Section ======= -->
            <section id="features" class="features" data-aos="fade-up">
            <div class="container">

                <div class="section-title">
                <h2>Calidez y comprensión humana</h2>
                <p>La mejor forma de agendamiento para tí</p>
                </div>

        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

                <div class="row content">
                <div class="col-md-5" data-aos="fade-right" data-aos-delay="100">
                    <img src="../images/features-1.png" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-4" data-aos="fade-left" data-aos-delay="100">
                    <h3>¿Qué es la psicoterapia?</h3>
                    <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

                    <p class="parrafo1">
                    La psicoterapia es un proceso de colaboración basado en la relación de una persona y un psicólogo. Como su base fundamental es el diálogo, esta te proporcionará un ambiente de apoyo que te permitirá hablar abiertamente con alguien objetivo, neutral e imparcial.
                    Tu psicólogo y tú trabajarán juntos para identificar y cambiar los patrones de pensamiento y comportamiento que te impiden sentirte bien.
                    Al concluir este proceso, no sólo habrás resuelto el problema que te trajo a la consulta, sino que, además, habrás aprendido nuevas destrezas para enfrentar con mayor efectividad cualquier desafío que pueda surgir en el futuro.
                    </p>
                    
                </div>
                </div>
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

                <div class="row content">
                <div class="col-md-5 order-1 order-md-2" data-aos="fade-left">
                    <img src="../images/features-2.png" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
                    <h3>Que Ventajas trae usar We</h3>
                    <p class="fst-italic">
                    Gestionar tus citas y progreso nunca fue tan facil y rapido!
                    </p>
                    <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </div>
                </div>
            </div>
            </section><!-- End Features Section -->

        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

        <!-- ======= Contact Section ======= -->
            <section id="contact" class="contact section-bg">
            <div class="container" data-aos="fade-up">

                <div class="section-title">
                <h2>Contactanos</h2>
                <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

                </div>

                <div class="row">

                <div class="col-lg-6">

                    <div class="row">
                    <div class="col-md-12">
                        <div class="info-box">
                        <i class="bx bx-map"></i>
                        <h3>Nuestra ubicación</h3>
                        <p>Bogotá, Colombia</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-envelope"></i>
                        <h3>Escribenos</h3>
                        <p>we@gmail.com<br>weadmin@gmail.com</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-phone-call"></i>
                        <h3>Llamanos</h3>
                        <p>+57 3213333333<br>+57 3213222223</p>
                        </div>
                    </div>
                    </div>

                </div>

                <div class="col-lg-6 mt-4 mt-md-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16289433.790265229!2d-83.39978676614085!3d4.609674209206876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1sen!2sco!4v1639426055177!5m2!1sen!2sco" 
                            width="600" height="380" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

                </div>

                </div>

            </div>
            
            </section><!-- End Contact Section -->
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

        <!-- ======= Footer Section ======= -->
        <section class="footerAbout" >
        <div>
            <h2 class="footertext">MisionTic 2022 - P5 - Grupo2 ©</h2>
            </div>  <!-- End Footer Section -->
        </section>

    </div>

</template>

<script>
export default{
methods:{
scrollToTop(){
                let currentScroll = document.documentElement.scrollTop,
                  int = setInterval(frame, 6)

                  function frame(){
                      if( 0 > currentScroll)
                          clearInterval(int)

                      else {
                          currentScroll = currentScroll - 12
                          document.documentElement.scrollTop = currentScroll

                      }
                  }
            },
}
}
</script>

<style>
.parrafo1{
    text-align:justify;
}


/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/
.contact .info-box {
  color: #2d405f;
  text-align: center;
  box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
  padding: 20px 0 30px 0;
  background: #fff;
}
.contact .info-box i {
  font-size: 32px;
  color: #3b4ef8;
  padding: 8px;
}
.contact .info-box h3 {
  font-size: 20px;
  color: #777777;
  font-weight: 700;
  margin: 10px 0;
}
.contact .info-box p {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}


.footerAbout{
    background-color: #303F9F;
    
}
.footerAbout .footertext{
color:white;    
}


.scroll-to-top {
     
      
   right: 0;
   
   z-index:100000;
 }
 .scroll-to-top button {
   border: none;
   background: #5162ce;
   position: fixed;
   right:10px;
   top:540px;
   cursor: pointer;
   z-index:1000000;
   border-radius:100px;
 }
 .scroll-to-top :hover{
    background: #333e88;
 }





</style>

