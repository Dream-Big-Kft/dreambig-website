import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { config } from "@/config";

type ContactProps = {
    sectionRef: React.RefObject<HTMLDivElement>;
}
export default function Contact(props: ContactProps) {
  const { sectionRef } = props;

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted" ref={sectionRef}  >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {config.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {config.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="card-hover-modern-light">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <p className="text-muted-foreground">
                  {config.contact.subtitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg mb-2">Phone</div>
                    <a 
                      href={`tel:${config.contact.contactInfo.phone}`}
                      className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
                      data-testid="link-phone"
                    >
                      {config.contact.contactInfo.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available 24/7 for emergency response
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg mb-2">Email</div>
                    <a 
                      href={`mailto:${config.contact.contactInfo.email}`}
                      className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
                      data-testid="link-email"
                    >
                      {config.contact.contactInfo.email}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We respond within 2 hours during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg mb-2">Location</div>
                    <div className="text-foreground text-lg">{config.contact.contactInfo.location}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Serving clients across London and surrounding areas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-lg mb-2">Business Hours</div>
                    <div className="text-foreground">
                      <div>{config.contact.contactInfo.businessHours.weekdays}</div>
                      <div>{config.contact.contactInfo.businessHours.emergency}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 btn-hover-modern-light"
                onClick={() => window.open(`tel:${config.contact.contactInfo.phone}`, '_self')}
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-5 w-5 icon-hover-modern" />
                Call Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 btn-hover-modern-light"
                onClick={() => window.open(`mailto:${config.contact.contactInfo.email}`, '_self')}
                data-testid="button-email-us"
              >
                <Mail className="mr-2 h-5 w-5 icon-hover-modern" />
                Email Us
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-4">{config.contact.contactInfo.emergencyResponse.title}</h3>
                <p className="text-primary-foreground/90 mb-4">
                  {config.contact.contactInfo.emergencyResponse.description}
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full btn-hover-modern-light"
                  onClick={() => window.open(`tel:${config.contact.contactInfo.phone}`, '_self')}
                >
                  <Phone className="mr-2 h-5 w-5 icon-hover-modern" />
                  Emergency Hotline
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover-modern-light">
              <CardHeader>
                <CardTitle className="text-lg">{config.contact.whyChooseUs.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {config.contact.whyChooseUs.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
