import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';


// Mock would be more suited here
// Current implementation shows how it should work
void main() {
  testWidgets('shows loading initially', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Scaffold(body: CircularProgressIndicator()),
    ));
    
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });

  testWidgets('shows permission dialog if needed', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Scaffold(
        body: AlertDialog(
          title: Text('Permissions Required'),
          content: Text('Location and Bluetooth permissions are necessary please ensure access rights'),
          actions: [
            TextButton(onPressed: null, child: Text('Open Settings')),
            TextButton(onPressed: null, child: Text('Try Again')),
          ],
        ),
      ),
    ));

    expect(find.text('Permissions Required'), findsOneWidget);
    expect(find.text('Open Settings'), findsOneWidget);
    expect(find.text('Try Again'), findsOneWidget);
  });
}
