import Time "mo:core/Time";
import List "mo:core/List";

actor {
  type Booking = {
    patientName : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    preferredDate : Text;
    message : Text;
    submissionTime : Time.Time;
  };

  let bookings = List.empty<Booking>();

  public shared ({ caller }) func submitBooking(patientName : Text, email : Text, phone : Text, serviceType : Text, preferredDate : Text, message : Text) : async () {
    let newBooking : Booking = {
      patientName;
      email;
      phone;
      serviceType;
      preferredDate;
      message;
      submissionTime = Time.now();
    };
    bookings.add(newBooking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.toArray();
  };
};
