import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Database, Lock, Mail } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
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
                        <Shield className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Privacy Policy
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-GB", {
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

                    {/* 1. Introduction */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                1. Introduction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                DreamBig Kft ("we", "our", or "us") respects your privacy
                                and is committed to protecting the personal information you share
                                with us. This policy explains how we handle any information
                                collected through our website.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 2. Information We Collect */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-primary" />
                                2. Information We Collect
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>We only collect personal information that you choose to provide, such as when you:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                <li>Contact us by email or through our contact form</li>
                                <li>Request information about our services</li>
                            </ul>
                            <p>
                                This information may include your name, contact details, and any message
                                content you choose to share.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 3. How We Use Your Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                3. How We Use Your Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>We use your personal data solely to:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                <li>Respond to your inquiries</li>
                                <li>Provide requested information about our services</li>
                                <li>Maintain administrative records related to your communication</li>
                            </ul>
                            <p>We do not use your information for marketing purposes without your explicit consent.</p>
                        </CardContent>
                    </Card>

                    {/* 4. Data Sharing */}
                    <Card>
                        <CardHeader>
                            <CardTitle>4. Data Sharing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                We do not share, sell, or rent personal data to third parties. Your
                                information will only be shared if required by law or to protect our
                                legal rights.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 5. Data Retention */}
                    <Card>
                        <CardHeader>
                            <CardTitle>5. Data Retention</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                We retain personal data only as long as necessary to fulfill the
                                purpose for which it was collected or to comply with legal
                                requirements.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 6. Data Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle>6. Data Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                We take reasonable and appropriate measures to protect your personal
                                information from unauthorized access, loss, misuse, or disclosure.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 7. Your Rights */}
                    <Card>
                        <CardHeader>
                            <CardTitle>7. Your Rights (UK GDPR)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                <li>Request access to your personal data</li>
                                <li>Request correction or deletion of your data</li>
                                <li>Withdraw consent at any time</li>
                                <li>Lodge a complaint with the UK Information Commissioner’s Office (ICO)</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 8. Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                8. Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                If you have questions about this policy or wish to exercise your
                                rights, please contact:
                            </p>
                            <div className="bg-muted/30 p-4 rounded-lg">
                                <p><strong>DreamBig Kft</strong></p>
                                <p>
                                    Email:{" "}
                                    <a
                                        href="mailto:privacy@dreambig.dev"
                                        className="text-primary hover:underline"
                                    >
                                        privacy@dreambig.dev
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
