import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, AlertTriangle, Clock, Mail, Scale } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Terms of Service
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Agreement */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Scale className="h-5 w-5 text-primary" />
                                Agreement to Terms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                By accessing our website or engaging our services, you agree to these Terms of Service.
                                If you do not agree, please discontinue use immediately. We may update these Terms periodically.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Services */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Services Provided
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                We provide professional software development services including:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                <li>Custom application development</li>
                                <li>Software consulting and architecture</li>
                                <li>Cloud infrastructure and DevOps</li>
                                <li>Mobile and web application development</li>
                            </ul>
                            <p>
                                All developers follow industry best practices and maintain professional development standards.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Client Responsibilities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Client Responsibilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>Clients agree to:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                <li>Provide accurate information about requirements</li>
                                <li>Follow professional guidance from security personnel</li>
                                <li>Ensure safe working conditions</li>
                                <li>Maintain confidentiality and comply with UK law</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Limitations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-primary" />
                                Limitations and Liability
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                While we maintain high professional standards, we cannot guarantee 100% uptime or bug-free software. 
                                We are not responsible for events beyond reasonable control. Liability is limited as permitted by law.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Payment & Cancellation */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment & Cancellation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                                <li>Payment terms are defined in individual service agreements</li>
                                <li>Advance payment may be required</li>
                                <li>Cancellation and refund policies vary by service type</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Confidentiality */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Confidentiality & Privacy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p>
                                All client information is handled with strict confidentiality. 
                                We do not share or disclose data without consent, except as required by law.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Legal */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Governing Law</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p>
                                These Terms are governed by the laws of England and Wales. 
                                Disputes will be resolved under the jurisdiction of English courts.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Updates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                Updates to Terms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p>
                                We may update these Terms periodically. Continued use of our website or services 
                                indicates acceptance of any changes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p>For any questions or legal inquiries, please contact:</p>
                            <div className="bg-muted/30 p-4 rounded-lg">
                                <p><strong>DreamBig Kft</strong></p>
                                <p>
                                    Email:{" "}
                                    <a
                                        href="mailto:legal@dreambig.dev"
                                        className="text-primary hover:underline"
                                    >
                                        legal@dreambig.dev
                                    </a>
                                </p>
                                <p>Győr, Hungary</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
